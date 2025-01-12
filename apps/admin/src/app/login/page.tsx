'use client';

import { useState } from 'react';
import { Button, TextboxWithError } from '@memory-quasar/ui';
import styles from './page.module.css';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: ログイン処理
    console.log('Login:', { email, password });
  };

  return (
    <main className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.title}>Memory Quasar</h1>
        <form className={styles.form} onSubmit={handleSubmit}>
          <TextboxWithError
            label="メールアドレス"
            type="email"
            value={email}
            onChange={setEmail}
            placeholder="example@example.com"
            size="full"
          />
          <TextboxWithError
            label="パスワード"
            type="password"
            value={password}
            onChange={setPassword}
            placeholder="••••••••"
            size="full"
          />
          <Button
            type="submit"
            label="ログイン"
            size="full"
            className={styles.button}
          />
        </form>
      </div>
    </main>
  );
} 