import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"

const HomePage = () => {
  const navigate = useNavigate()

  return (
    <section className="flex min-h-[70vh] flex-col items-center justify-center gap-6 text-center">
      <h1 className="max-w-2xl text-3xl font-semibold tracking-tight md:text-4xl">
        Welcome to Doctor's Appointment Application
      </h1>
      <Button size="lg" 
        onClick={() => navigate("/login")}>
        Book a medical appointment
      </Button>
    </section>
  )
}

export default HomePage;
