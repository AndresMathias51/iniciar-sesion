"use client";

import { useState } from "react";
import RegisterForm from "@/components/inicio_sesion/RegisterForm";

export default function RegisterPage() {
  return (
    <main className="authPage">
      <RegisterForm/>
    </main>
  );
}