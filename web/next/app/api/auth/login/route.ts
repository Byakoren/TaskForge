import { NextResponse } from "next/server";
import { verifyCredentials } from "@/lib/auth";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}));
  const email = String(body.email ?? "").trim();
  const password = String(body.password ?? "");

  if (!email || !password) {
    return NextResponse.json(
      { error: "Email et mot de passe sont obligatoires." },
      { status: 400 },
    );
  }

  const user = await verifyCredentials(email, password);

  if (!user) {
    return NextResponse.json(
      { error: "Identifiants invalides." },
      { status: 401 },
    );
  }

  const token = `demo-token-${Date.now()}`;

  return NextResponse.json({
    token,
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
    },
  });
}
