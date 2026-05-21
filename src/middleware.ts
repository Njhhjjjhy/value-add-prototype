import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const PASSWORD = "moreharvest2026";

export function middleware(request: NextRequest) {
  const authHeader = request.headers.get("authorization");

  if (authHeader?.startsWith("Basic ")) {
    const encoded = authHeader.slice(6);
    const decoded = atob(encoded);
    const password = decoded.split(":")[1] ?? "";
    if (password === PASSWORD) {
      return NextResponse.next();
    }
  }

  return new NextResponse("Authentication required", {
    status: 401,
    headers: {
      "WWW-Authenticate": 'Basic realm="value-add-prototype", charset="UTF-8"',
    },
  });
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon).*)"],
};
