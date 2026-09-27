import { api as request } from "./api";

export const mockApi = {
  async login(email, password, role) {
    const response = await request("/auth/login", {
      method: "POST",

      body: JSON.stringify({
        email,
        password,
      }),
    });

    if (!response.ok) {
      throw new Error("Invalid email or password");
    }

    const data = await response.json();

    if (data.token) {
      localStorage.setItem("token", data.token);
    }

    if (data.user) {
      localStorage.setItem("user", JSON.stringify(data.user));
    }

    return data.user;
  },

  async register(payload) {
    const response = await request("/auth/register", {
      method: "POST",

      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const error = await response.text();

      throw new Error(error || "Registration failed");
    }

    return response.json();
  },

  async getDashboard(role, userId) {
    const trips = await this.getTrips();

    const buses = await this.getBuses();

    const reservations = await this.getReservations(userId);

    return {
      trips,

      buses,

      reservations,
    };
  },

  async getTrips() {
    const response = await request("/trips/active");

    if (!response.ok) {
      throw new Error("Failed to load trips");
    }

    return response.json();
  },

  async getTrip(id) {
    const response = await request(`/trips/${id}`);

    if (!response.ok) {
      throw new Error("Trip not found");
    }

    return response.json();
  },

  async getBuses() {
    const response = await request("/buses");

    if (!response.ok) {
      throw new Error("Failed to load buses");
    }

    return response.json();
  },

  async getRoutes() {
    const response = await request("/routes");

    if (!response.ok) {
      throw new Error("Failed to load routes");
    }

    return response.json();
  },

  async getReservations(userId) {
    const response = await request(`/reservations/user/${userId}`);

    if (!response.ok) {
      throw new Error("Failed to load reservations");
    }

    return response.json();
  },

  async reserve(userId, tripId) {
    const response = await request("/reservations", {
      method: "POST",

      body: JSON.stringify({
        userId,

        tripId,
      }),
    });

    if (!response.ok) {
      const error = await response.text();

      throw new Error(error || "Reservation failed");
    }

    return response.json();
  },

  async cancelReservation(id) {
    const response = await request(`/reservations/${id}`, {
      method: "DELETE",
    });

    return response.ok;
  },

  async getUsers() {
    const response = await request("/users");

    if (!response.ok) {
      throw new Error("Failed to load users");
    }

    return response.json();
  },

  async saveEntity() {
    throw new Error("Admin CRUD API connection pending");
  },

  async deleteEntity() {
    throw new Error("Admin delete API connection pending");
  },

  resetDemo() {
    localStorage.removeItem("token");

    localStorage.removeItem("user");
  },
};

// keep old frontend imports working
export const api = mockApi;
