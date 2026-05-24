import { LoginForm } from "./LoginForm";

export const dynamic = "force-dynamic";

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-navy-950 text-white">
      <div className="grid min-h-screen lg:grid-cols-2">
        <div className="relative hidden overflow-hidden lg:block">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(230,177,52,0.18),transparent_55%),linear-gradient(135deg,#0f1a30,#1a2a49)]" />
          <div className="relative flex h-full flex-col justify-between p-12">
            <div className="font-serif text-2xl font-semibold">AU Hospital</div>
            <div className="max-w-md">
              <p className="text-xs uppercase tracking-widest text-gold-300">
                Investor Project · Admin Console
              </p>
              <h2 className="mt-3 font-serif text-4xl leading-tight">
                Manage your investor-facing project website.
              </h2>
              <p className="mt-4 text-sm text-white/70">
                Sign in to update homepage content, slides, highlights, gallery,
                documents and investor leads.
              </p>
            </div>
            <div className="text-xs text-white/40">Project Development Phase</div>
          </div>
        </div>

        <div className="flex items-center justify-center bg-white p-6 text-foreground">
          <div className="w-full max-w-sm">
            <h1 className="font-serif text-2xl font-semibold text-navy-900">
              Sign in
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Use your administrator credentials.
            </p>
            <div className="mt-8">
              <LoginForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
