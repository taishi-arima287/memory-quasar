'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button, TextboxWithError } from '@memory-quasar/ui';
import styles from './page.module.css';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';

// バリデーションスキーマ
const loginSchema = z.object({
  email: z
    .string()
    .min(1, { message: 'メールアドレスを入力してください' })
    .email({ message: 'メールアドレスの形式が正しくありません' }),
  password: z
    .string()
    .min(8, { message: 'パスワードは8文字以上で入力してください' }),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      setIsLoading(true);
      setApiError(null);

      const result = await signIn('credentials', {
        email: data.email,
        password: data.password,
        redirect: false,
      });

      if (result?.error) {
        setApiError('メールアドレスまたはパスワードが正しくありません');
        return;
      }

      router.push('/document');
    } catch {
      setApiError('予期せぬエラーが発生しました');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.title}>Memory Quasar</h1>
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          {apiError && (
            <p className={styles.errorMessage}>{apiError}</p>
          )}
          <TextboxWithError
            label="メールアドレス"
            type="email"
            placeholder="example@example.com"
            error={errors.email?.message}
            size="full"
            {...register('email', { required: true })}
          />
          <TextboxWithError
            label="パスワード"
            type="password"
            placeholder="••••••••"
            error={errors.password?.message}
            size="full"
            {...register('password', { required: true })}
          />
          <Button
            type="submit"
            label={isLoading ? 'ログイン中...' : 'ログイン'}
            size="full"
            disabled={isLoading}
            className={styles.button}
          />
        </form>
      </div>
    </main>
  );
} 