import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/context/AuthProvider"

const HomePage = () => {
  const navigate = useNavigate()
  const { isAuthenticated } = useAuth()

  const handleBookAppointment = () => {
    navigate(isAuthenticated ? "/users/specialties" : "/auth/login")
  }

  return (
    <>
      <section className="flex min-h-[70vh] flex-col items-center justify-center gap-6 text-center">
      <h1 className="max-w-2xl text-3xl font-semibold tracking-tight md:text-4xl">
        Welcome to Booking Medical Appointment Application
      </h1>
      <Button size="lg" onClick={handleBookAppointment}>
        Book an appointment
      </Button>
    </section>
    </>
  )
}

export default HomePage;
