"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function LoginPage() {
  const [formData, setFormData] = useState({
    emailOrUsername: "",
    password: "",
  })

  const [errors, setErrors] = useState<Record<string, string>>({})
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }))
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.emailOrUsername.trim()) {
      newErrors.emailOrUsername = "Email or username is required"
    }
    if (!formData.password.trim()) {
      newErrors.password = "Password is required"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (validateForm()) {
      // Simulate login validation - accept any non-empty credentials
      setMessage({
        type: "success",
        text: `Welcome back! Successfully logged in as ${formData.emailOrUsername}`,
      })

      // Reset form after 3 seconds
      setTimeout(() => {
        setFormData({
          emailOrUsername: "",
          password: "",
        })
        setMessage(null)
      }, 3000)
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-muted flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2 text-balance">Sign In</h1>
          <p className="text-base text-muted-foreground">Access the laboratory system</p>
        </div>

        {/* Success/Error Message */}
        {message && (
          <div
            className={`mb-6 p-4 rounded-lg border ${
              message.type === "success" ? "bg-green-50 border-green-200" : "bg-red-50 border-red-200"
            }`}
          >
            <p className={`font-medium text-center ${message.type === "success" ? "text-green-800" : "text-red-800"}`}>
              {message.type === "success" ? "✓ " : "✗ "}
              {message.text}
            </p>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email or Username Field */}
          <div>
            <label htmlFor="emailOrUsername" className="block text-sm font-medium text-foreground mb-2">
              Email or Username
            </label>
            <Input
              id="emailOrUsername"
              type="text"
              name="emailOrUsername"
              value={formData.emailOrUsername}
              onChange={handleChange}
              placeholder="Enter your email or username"
              className={errors.emailOrUsername ? "border-destructive" : ""}
              disabled={message !== null}
            />
            {errors.emailOrUsername && <p className="text-destructive text-sm mt-1">{errors.emailOrUsername}</p>}
          </div>

          {/* Password Field */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-foreground mb-2">
              Password
            </label>
            <Input
              id="password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className={errors.password ? "border-destructive" : ""}
              disabled={message !== null}
            />
            {errors.password && <p className="text-destructive text-sm mt-1">{errors.password}</p>}
          </div>

          {/* Login Button */}
          <Button
            type="submit"
            size="lg"
            className="w-full mt-6 py-6 text-base font-semibold"
            disabled={message !== null}
          >
            Log In
          </Button>
        </form>

        {/* Footer Note */}
        <div className="mt-8 text-center text-sm text-muted-foreground">
          <p>Lab Assignment • Login Form</p>
        </div>
      </div>
    </main>
  )
}
