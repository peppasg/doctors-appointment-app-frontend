import { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Calendar } from "@/components/ui/calendar";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useDialogState } from "@/hooks/useDialogState";
import { getAppointments, getSlotsForDate, bookAppointment, deleteAppointment } from "@/api/appointments";
import { useAuth } from "@/context/AuthProvider";

type StoredAppointment = {
  id: string;
  date: string;
  slot: string;
  specialty: string;
  user: string;
};

const formatLocalDate = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const parseAppointmentDateTime = (date: string, slot: string) => {
  const [hours, minutes] = slot.split(":").map(Number);

  if (!date || Number.isNaN(hours) || Number.isNaN(minutes)) {
    return null;
  }

  return new Date(`${date}T${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:00`);
};

const isPastAppointment = (date: string, slot: string) => {
  const appointmentDate = parseAppointmentDateTime(date, slot);
  return appointmentDate ? appointmentDate.getTime() < Date.now() : false;
};

const AppointmentBookingPage = () => {
  const [searchParams] = useSearchParams();
  const specialty = searchParams.get("specialty") ?? "Pathology";
  const { accessToken } = useAuth();

  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [slots, setSlots] = useState<string[]>([]);
  const [appointments, setAppointments] = useState<StoredAppointment[]>([]);
  const [slotChoice, setSlotChoice] = useState<string>("");
  const deleteDialog = useDialogState();
  const [editingAppointment, setEditingAppointment] = useState<StoredAppointment | null>(null);

  useEffect(() => {
    const loadAppointments = async () => {
      if (!accessToken) return;

      try {
        const data = await getAppointments(accessToken);
        setAppointments(data);
      } catch (error) {
        toast.error(error instanceof Error ? error.message : "Unable to load appointments");
      }
    };

    loadAppointments();
  }, [accessToken]);

  useEffect(() => {
    const loadSlots = async () => {
      if (!selectedDate || !accessToken) {
        setSlots([]);
        return;
      }

      try {
        const dateStr = formatLocalDate(selectedDate);
        const available = await getSlotsForDate(dateStr, accessToken);
        setSlots(available);
        setSlotChoice("");
      } catch (error) {
        toast.error(error instanceof Error ? error.message : "Unable to load slots");
      }
    };

    loadSlots();
  }, [selectedDate, accessToken]);

  const myAppointments = useMemo(
    () =>
      [...appointments].sort((a, b) => {
        const aDate = parseAppointmentDateTime(a.date, a.slot);
        const bDate = parseAppointmentDateTime(b.date, b.slot);

        if (!aDate && !bDate) return 0;
        if (!aDate) return 1;
        if (!bDate) return -1;

        return bDate.getTime() - aDate.getTime();
      }),
    [appointments]
  );

  const selectedDateKey = selectedDate ? formatLocalDate(selectedDate) : null;
  const hasSameSpecialtySameDay =
    selectedDateKey !== null &&
    appointments.some(
      (appointment) =>
        appointment.date === selectedDateKey &&
        appointment.specialty.toLowerCase() === specialty.toLowerCase()
    );

  const handleBook = async () => {
    if (!selectedDate || !slotChoice || !accessToken) {
      return;
    }

    try {
      const dateStr = formatLocalDate(selectedDate);
      await bookAppointment({ date: dateStr, slot: slotChoice, specialty }, accessToken);
      const refreshed = await getAppointments(accessToken);
      setAppointments(refreshed);
      setSlotChoice("");
      toast.success(`An appointment was booked on ${dateStr} at ${slotChoice} (${specialty})`);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Booking failed");
    }
  };

  const confirmDelete = async () => {
    if (!editingAppointment || !accessToken) {
      return;
    }

    try {
      await deleteAppointment(editingAppointment.id, accessToken);
      const refreshed = await getAppointments(accessToken);
      setAppointments(refreshed);
      toast.success("Appointment deleted!");
      deleteDialog.closeDialog();
      setEditingAppointment(null);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Delete failed");
    }
  };

  return (
    <>
      <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Book an appointment</h1>
      <p className="text-xl font-bold text-center mb-2">Specialty: {specialty}</p>

      <Calendar
        mode="single"
        selected={selectedDate}
        onSelect={setSelectedDate}
        disabled={{ before: new Date() }}
      />

      {selectedDate && (
        <div className="flex flex-col gap-3">
          {hasSameSpecialtySameDay ? (
            <p className="text-sm text-red-600">
              You already have an appointment in this specialty for this day.
            </p>
          ) : (
            <div className="flex gap-2 items-center">
              <select
                value={slotChoice}
                onChange={(e) => setSlotChoice(e.target.value)}
                className="border rounded p-2"
              >
                <option value="">Choose slot</option>
                {slots.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>

              <Button
                onClick={handleBook}
                disabled={hasSameSpecialtySameDay}
              >
                Book an appointment
              </Button>
            </div>
          )}
        </div>
      )}

      <div className="mt-6">
        <h2 className="text-lg font-bold text-center mt-4 mb-2">My Appointments</h2>

        {myAppointments.length === 0 ? (
          <p className="text-gray-600">You have no appointments yet.</p>
        ) : (
          <ul className="space-y-2">
            {myAppointments.map((a) => {
              const past = isPastAppointment(a.date, a.slot);

              return (
                <li
                  key={a.id}
                  className="flex justify-between items-center border rounded p-2"
                >
                  <span className={past ? "line-through text-gray-500" : ""}>
                    {a.date} — {a.slot} ({a.specialty})
                  </span>

                  <Button
                    variant="destructive"
                    onClick={() => {
                      setEditingAppointment(a);
                      deleteDialog.openDialog();
                    }}
                  >
                    Delete
                  </Button>
                </li>
              );
            })}
          </ul>
        )}
      </div>

      <div className="pt-2 text-center">
        <Link to="/users/specialties">
          <Button variant="outline">Choose another specialty</Button>
        </Link>
      </div>

      <Dialog open={deleteDialog.open} onOpenChange={deleteDialog.setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Delete</DialogTitle>
          </DialogHeader>

          <p>Are you sure you want to delete this appointment?</p>

          <DialogFooter>
            <Button variant="outline" onClick={deleteDialog.closeDialog}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={confirmDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
    </>
  );
    
};

export default AppointmentBookingPage;
