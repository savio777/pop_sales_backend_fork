export function generateEmail(): string {
  const domains = ["gmail.com", "yahoo.com", "outlook.com", "hotmail.com"];
  const name = Math.random().toString(36).substring(2, 12); // Generates a random string of 10 characters
  const domain = domains[Math.floor(Math.random() * domains.length)];
  return `${name}@${domain}`;
}


