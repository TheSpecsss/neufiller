import { NextResponse, type NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";

export async function updateSession(request: NextRequest) {
  const response = NextResponse.next();

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || "env-err",
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY|| "env-err",
    {
      cookies: {
        getAll: () => request.cookies.getAll(),
        setAll: (cookies) => {
          // biome-ignore lint/complexity/noForEach: <explanation>
          cookies.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  const { data: { user } } = await supabase.auth.getUser();

  const { pathname, searchParams } = request.nextUrl;
  const redirect = (path: string) => {
    const url = request.nextUrl.clone();
    url.pathname = path;
    return NextResponse.redirect(url);
  };

  // Redirect logic based on authentication
  if (!user && !pathname.startsWith("/signin") && !pathname.startsWith("/auth")) {
    searchParams.set("next", pathname);
    return redirect("/signin");
  }

  if (user && pathname.startsWith("/signin")) {
    return redirect("/");
  }

  return response;
}
