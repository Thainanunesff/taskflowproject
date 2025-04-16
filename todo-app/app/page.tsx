import { redirect } from "next/navigation"
import AuthForm from "@/components/auth-form"
import Logo from "@/components/logo"
import { Button } from "@/components/ui/button"

export default function Home() {
  // This would check if the user is authenticated in a real app
  // For now, we'll just show the auth form
  const isAuthenticated = false

  if (isAuthenticated) {
    redirect("/dashboard")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-indigo-50">
      <div className="container mx-auto px-4 py-8">
        <header className="flex items-center justify-between py-6">
          <Logo size="md" />
          <Button variant="ghost" className="text-slate-600 hover:text-purple-600">
            About Us
          </Button>
        </header>

        <div className="flex flex-col items-center justify-center py-12 md:flex-row md:gap-12 md:py-24">
          <div className="mb-10 max-w-md md:mb-0 md:w-1/2">
            <h1 className="mb-4 text-4xl font-bold tracking-tight text-slate-900 md:text-5xl">
              Organize your tasks, <span className="text-purple-600">boost your productivity</span>
            </h1>
            <p className="mb-6 text-lg text-slate-600">
              TaskMaster helps you manage your tasks efficiently, so you can focus on what matters most.
            </p>
            <div className="flex gap-4">
              <Button size="lg" className="bg-purple-600 hover:bg-purple-700">
                Get Started
              </Button>
              <Button size="lg" variant="outline" className="border-purple-200 text-purple-600 hover:bg-purple-50">
                Learn More
              </Button>
            </div>
          </div>
          <div className="w-full max-w-md md:w-1/2">
            <div className="rounded-xl bg-white p-6 shadow-xl">
              <AuthForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
