import { type NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import * as z from "zod";

const SettingsSchema = z.object({
  hideGenAI: z.boolean(),
  hideUpgrades: z.boolean(),
  hideCrypto: z.boolean(),
});

export async function GET() {
  const session = await auth();
  if (!session || !session.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { email } = session.user;

  const user = await prisma.user.findUnique({ where: { email } });
  if (user) {
    return NextResponse.json({
      hideGenAI: user.hideGenAI,
      hideUpgrades: user.hideUpgrades,
      hideCrypto: user.hideCrypto,
    });
  } else {
    const newUser = await prisma.user.create({ data: { email } });
    return NextResponse.json({
      hideGenAI: newUser.hideGenAI,
      hideUpgrades: newUser.hideUpgrades,
      hideCrypto: newUser.hideCrypto,
    });
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    if (!session || !session.user?.email) {
      return NextResponse.json({ error: "Unauthorized - Please login first" }, { status: 401 });
    }
    const jsonData = await request.json();
    const parsedSettings = SettingsSchema.safeParse(jsonData);
    if (!parsedSettings.success) {
      return NextResponse.json({ error: "Invalid settings" }, { status: 400 });
    }
    const { hideGenAI, hideUpgrades, hideCrypto } = parsedSettings.data;
    const { email } = session.user;

    const user = await prisma.user.findUnique({ where: { email } });
    if (user) {
      const updatedUser = await prisma.user.update({
        where: { email },
        data: { hideGenAI, hideUpgrades, hideCrypto },
      });
      return NextResponse.json({
        hideGenAI: updatedUser.hideGenAI,
        hideUpgrades: updatedUser.hideUpgrades,
        hideCrypto: updatedUser.hideCrypto,
      });
    } else {
      const newUser = await prisma.user.create({
        data: { email, hideGenAI, hideUpgrades, hideCrypto },
      });
      return NextResponse.json({
        hideGenAI: newUser.hideGenAI,
        hideUpgrades: newUser.hideUpgrades,
        hideCrypto: newUser.hideCrypto,
      });
    }
  } catch (error) {
    console.error("[!] Error processing settings update:", error);
    return NextResponse.json({ error: "Failed to update settings" }, { status: 500 });
  }
}