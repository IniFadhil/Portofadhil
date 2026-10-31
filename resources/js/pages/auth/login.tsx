import { Form, Head } from '@inertiajs/react';
import InputError from '@/components/input-error';
import PasskeyVerify from '@/components/passkey-verify';
import PasswordInput from '@/components/password-input';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import { AUTH } from '@/data/portfolio';
import type { AuthCopy } from '@/data/portfolio';
import { useLocale } from '@/hooks/use-locale';
import { register } from '@/routes';
import { store } from '@/routes/login';
import { request } from '@/routes/password';

type Props = {
    status?: string;
    canResetPassword: boolean;
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function emailError(value: string, copy: AuthCopy): string | null {
    if (value.trim() === '') {
        return copy.errors.emailRequired;
    }

    return EMAIL_PATTERN.test(value.trim()) ? null : copy.errors.emailInvalid;
}

function passwordError(value: string, copy: AuthCopy): string | null {
    return value === '' ? copy.errors.passwordRequired : null;
}

export default function Login({ status, canResetPassword }: Props) {
    const [locale] = useLocale();
    const copy = AUTH[locale];

    return (
        <>
            <Head title={copy.pageTitle} />

            <PasskeyVerify
                label={copy.passkey}
                loadingLabel={copy.passkeyLoading}
                separator={copy.passkeySeparator}
            />

            <Form
                {...store.form()}
                resetOnSuccess={['password']}
                className="flex flex-col gap-5"
            >
                {({ processing, errors, setError, clearErrors }) => (
                    <>
                        <div className="grid gap-5">
                            <div className="grid gap-2">
                                <Label htmlFor="email">{copy.email}</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    name="email"
                                    required
                                    autoFocus
                                    tabIndex={1}
                                    autoComplete="email"
                                    placeholder="email@example.com"
                                    aria-invalid={Boolean(errors.email)}
                                    aria-describedby={
                                        errors.email ? 'email-error' : undefined
                                    }
                                    onChange={() => clearErrors('email')}
                                    onBlur={(event) => {
                                        const message = emailError(
                                            event.target.value,
                                            copy,
                                        );

                                        if (message) {
                                            setError('email', message);
                                        } else {
                                            clearErrors('email');
                                        }
                                    }}
                                />
                                <InputError
                                    id="email-error"
                                    message={errors.email}
                                />
                            </div>

                            <div className="grid gap-2">
                                <div className="flex items-center">
                                    <Label htmlFor="password">
                                        {copy.password}
                                    </Label>
                                    {canResetPassword && (
                                        <TextLink
                                            href={request()}
                                            className="ml-auto text-sm text-ink-850"
                                            tabIndex={5}
                                        >
                                            {copy.forgot}
                                        </TextLink>
                                    )}
                                </div>
                                <PasswordInput
                                    id="password"
                                    name="password"
                                    required
                                    tabIndex={2}
                                    autoComplete="current-password"
                                    placeholder={copy.password}
                                    aria-invalid={Boolean(errors.password)}
                                    aria-describedby={
                                        errors.password
                                            ? 'password-error'
                                            : undefined
                                    }
                                    onChange={() => clearErrors('password')}
                                    onBlur={(event) => {
                                        const message = passwordError(
                                            event.target.value,
                                            copy,
                                        );

                                        if (message) {
                                            setError('password', message);
                                        } else {
                                            clearErrors('password');
                                        }
                                    }}
                                />
                                <InputError
                                    id="password-error"
                                    message={errors.password}
                                />
                            </div>

                            <div className="flex items-center space-x-3">
                                <Checkbox
                                    id="remember"
                                    name="remember"
                                    tabIndex={3}
                                />
                                <Label htmlFor="remember">
                                    {copy.remember}
                                </Label>
                            </div>

                            <Button
                                type="submit"
                                className="mt-2 w-full bg-gold-400 font-semibold text-ink-950 hover:bg-gold-300 focus-visible:border-gold-500 focus-visible:ring-gold-400/50"
                                tabIndex={4}
                                disabled={processing}
                                data-test="login-button"
                            >
                                {processing && <Spinner />}
                                {copy.submit}
                            </Button>
                        </div>

                        <div className="text-center text-sm text-muted-foreground">
                            {copy.noAccount}{' '}
                            <TextLink
                                href={register()}
                                className="text-ink-850"
                                tabIndex={5}
                            >
                                {copy.signUp}
                            </TextLink>
                        </div>
                    </>
                )}
            </Form>

            {status && (
                <div className="mt-4 text-center text-sm font-medium text-green-600">
                    {status}
                </div>
            )}
        </>
    );
}
