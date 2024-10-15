import React, { useState } from 'react';
import {PasswordGeneratorService} from "../../Services";

export const PasswordGenerator: React.FC = () => {
  const [password, setPassword] = useState<string>('');
  const [length, setLength] = useState<number>(12);
  const [includeSymbols, setIncludeSymbols] = useState<boolean>(true);
  const [includeNumbers, setIncludeNumbers] = useState<boolean>(true);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const service = new PasswordGeneratorService();

  const generatePassword = () => {
    const newPassword = service.generatePassword(length, includeNumbers, includeSymbols);
    setPassword(newPassword);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const addPasswordToFile = async () => {
    const blob = await service.addPasswordToFile(selectedFile, password);
    if (blob) {
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = selectedFile?.name || 'password.txt';
      link.click();
      setPassword('');
    }
  };

  return (
    <div>
      <h1>Генератор паролей</h1>
      <label>
        Длина пароля:
        <input
          type="number"
          value={length}
          onChange={(e) => setLength(Number(e.target.value))}
          min="1"
          max="20"
        />
      </label>
      <div>
        <label>
          <input
            type="checkbox"
            checked={includeNumbers}
            onChange={() => setIncludeNumbers(!includeNumbers)}
          />
          Включить цифры
        </label>
        <label>
          <input
            type="checkbox"
            checked={includeSymbols}
            onChange={() => setIncludeSymbols(!includeSymbols)}
          />
          Включить символы
        </label>
      </div>
      <button onClick={generatePassword}>Сгенерировать пароль</button>
      <h2>Сгенерированный пароль: {password}</h2>

      <div>
        <input type="file" onChange={handleFileChange} />
      </div>
      {password && (
        <button onClick={addPasswordToFile}>Добавить пароль в файл</button>
      )}
    </div>
  );
};
