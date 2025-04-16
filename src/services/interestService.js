const API_BASE = "http://localhost/caback/interest";

export const getAllInterests = async () => {
  const res = await fetch(`${API_BASE}/get_interest.php`);
  return await res.json();
};

export const getUserInterests = async (userId) => {
  const res = await fetch(
    `${API_BASE}/get_user_interest.php?user_id=${userId}`
  );
  return await res.json();
};

export const addUserInterest = async (userId, interestId) => {
  const res = await fetch(`${API_BASE}/add_user_interest.php`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ user_id: userId, interest_id: interestId }),
  });
  return await res.json();
};

export const deleteUserInterest = async (userId, interestId) => {
  const res = await fetch(`${API_BASE}/delete_user_interest.php`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ user_id: userId, interest_id: interestId }),
  });
  return await res.json();
};
