// src/PasswordGeneratorService.ts
export class PasswordGeneratorService {
  private letters: string;
  private numbers: string;
  private symbols: string;

  constructor() {
    this.letters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    this.numbers = '0123456789';
    this.symbols = '!@#$%^&*()_+[]{}|;:,.<>?';
  }

  generatePassword(length: number, includeNumbers: boolean, includeSymbols: boolean): string {
    let characters = this.letters;

    if (includeNumbers) characters += this.numbers;
    if (includeSymbols) characters += this.symbols;

    let newPassword = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      newPassword += characters[randomIndex];
    }

    return newPassword;
  }

  async addPasswordToFile(file: File | null, password: string): Promise<Blob | null> {
    if (!file) return null;

    const reader = new FileReader();
    return new Promise((resolve) => {
      reader.onload = (event) => {
        const existingContent = event.target?.result as string;
        const newContent = existingContent + '\n' + password;
        resolve(new Blob([newContent], { type: 'text/plain' }));
      };

      reader.readAsText(file);
    });
  }
}
