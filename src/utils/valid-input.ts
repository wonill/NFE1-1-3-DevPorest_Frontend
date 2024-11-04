export const validateInput = (type: "email" | "mobile" | "github" | "url", value: string) => {
  const validators = {
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    mobile: /^(010-\d{4}-\d{4})$/,
    github: /^https:\/\/github\.com\/[A-Za-z0-9_.-]+\/?$/,
    url: /^(https?:\/\/)?([\w.-]+)+(:\d+)?(\/[\w.-]*)*\/?$/,
  };

  const regex = validators[type];

  return regex.test(value);
};
