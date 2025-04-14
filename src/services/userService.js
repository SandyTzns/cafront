// userService.js

const API_BASE_URL =
  process.env.REACT_APP_USER_API_URL || "http://localhost/caback/user";

export const registerUser = async (userData) => {
  try {
    const formData = new FormData();
    formData.append("pseudo", userData.pseudo);
    formData.append("lastName", userData.lastName);
    formData.append("firstName", userData.firstName);
    formData.append("email", userData.email);
    formData.append("password", userData.password);

    if (userData.avatar) {
      formData.append("avatar", userData.avatar);
    }
    if (userData.interests) {
      formData.append("interests", JSON.stringify(userData.interests));
    }

    // Publicité fields
    if (userData.company_name) {
      formData.append("company_name", userData.company_name);
    }
    if (userData.company_url) {
      formData.append("company_url", userData.company_url);
    }
    if (userData.company_logo) {
      formData.append("company_logo", userData.company_logo);
    }

    const response = await fetch(`${API_BASE_URL}/save_user.php`, {
      method: "POST",
      body: formData, // FormData auto-sets Content-Type
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error registering user:", error);
    throw error;
  }
};

export const loginUser = async (email, password, rememberMe) => {
  try {
    console.log("🛠️ Sending request to login.php...");
    console.log("📨 Email:", email);
    console.log("🔑 Password:", password);

    const response = await fetch(`${API_BASE_URL}/login.php`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, remember_me: rememberMe }),
    });

    const data = await response.json();

    console.log("📩 Response received:", data);

    return data;
  } catch (error) {
    console.error("❌ Error logging in:", error);
    return { success: false, message: "Erreur lors de la connexion." };
  }
};

export const checkSession = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/session_status.php`, {
      method: "GET",
      credentials: "include", // Very important to include cookies!
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error checking session:", error);
    return { isLoggedIn: false };
  }
};

export async function logoutUser() {
  const response = await fetch(`${API_BASE_URL}/logout.php`, {
    method: "POST",
    credentials: "include", // make sure this is set for cookies
  });

  if (response.ok) {
    return true;
  } else {
    throw new Error("Erreur lors de la déconnexion");
  }
}
