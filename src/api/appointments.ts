const API_URL = (import.meta.env.VITE_API_URL || "http://localhost:3001");

async function apiRequest<T>(path: string, token: string, init: RequestInit = {}): Promise<T> {
  const res = await fetch(`${API_URL}${path}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      ...(init.headers ?? {}),
    },
  });

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    throw new Error(data.message || "Request failed");
  }

  return data as T;
}

export async function getAppointments(token: string) {
  return apiRequest<Array<{ id: string; date: string; slot: string; specialty: string; user: string }>>(
    "/appointments",
    token,
  );
}

export async function getSlotsForDate(date: string, token: string): Promise<string[]> {
  return apiRequest<string[]>(`/appointments/slots?date=${date}`, token);
}

export async function bookAppointment(
  payload: {
    date: string; 
    slot: string; 
    specialty?: string},
    token: string,
) {
  return apiRequest<{ id: string; date: string; slot: string; specialty: string; user: string }>(
    "/appointments",
    token,
    {
      method: "POST",
      body: JSON.stringify(payload),
    },
  );
}

export async function updateAppointment(
  id: string,
  payload: { date: string; slot: string },
  token: string,
) {
  return apiRequest<{ id: string; date: string; slot: string; specialty: string; user: string }>(
    `/appointments/${id}`,
    token,
    {
      method: "PUT",
      body: JSON.stringify(payload),
    },
  );
}

export async function deleteAppointment(id: string, token: string) {
  return apiRequest<{ message: string }>(`/appointments/${id}`, token, { method: "DELETE" });
}
