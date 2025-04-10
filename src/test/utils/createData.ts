class CreateData {
  email(): string {
    const domains = ["gmail.com", "yahoo.com", "outlook.com", "hotmail.com"];
    const name = Math.random().toString(36).substring(2, 12); // Generates a random string of 10 characters
    const domain = domains[Math.floor(Math.random() * domains.length)];
    return `${name}@${domain}`;
  }

  password(): string {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:,.<>?';
    let password = '';
    
    for (let i = 0; i < 10; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      password += characters[randomIndex];
    }
    
    return password;
  }

  phoneNumber(): string {
    const ddd = Math.floor(Math.random() * 90) + 10;
    const numero = Math.floor(Math.random() * 1000000000);
    return `(${ddd}) ${numero.toString().padStart(9, '0')}`;
  }

  name(): string {
    const firstNames = [
      "Miguel", "Sofia", "Arthur", "Helena", "Bernardo", "Valentina", "Heitor", "Laura",
      "Davi", "Isabella", "Lorenzo", "Manuela", "Théo", "Júlia", "Pedro", "Alice",
      "Gabriel", "Clara", "Enzo", "Luiza"
    ];

    const lastNames = [
      "Silva", "Santos", "Oliveira", "Souza", "Rodrigues", "Ferreira", "Alves", "Lima",
      "Pereira", "Gomes", "Costa", "Ribeiro", "Martins", "Carvalho", "Almeida", "Lopes",
      "Soares", "Fernandes", "Vieira", "Barbosa"
    ];

    const randomFirstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const randomLastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    const randomMiddleName = lastNames[Math.floor(Math.random() * lastNames.length)];

    return `${randomFirstName} ${randomMiddleName} ${randomLastName}`;
  }

  zipCode(): string {
    const firstPart = Math.floor(Math.random() * 100000).toString().padStart(5, '0');
    const secondPart = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    return `${firstPart}-${secondPart}`;
  }

  lat(): number {
    return Number((Math.random() * 180 - 90).toFixed(6));
  }

  lon(): number {
    return Number((Math.random() * 360 - 180).toFixed(6));
  }
}

export const createData = new CreateData();
