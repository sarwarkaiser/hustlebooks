import { SignUp } from '@clerk/nextjs'

export default function SignUpPage() {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-bold text-slate-900">
            Create your account
          </h2>
          <p className="mt-2 text-sm text-slate-600">
            Start tracking your side hustles in minutes
          </p>
        </div>
        <div className="bg-white py-8 px-4 shadow-lg rounded-lg sm:px-10">
          <SignUp
            appearance={{
              elements: {
                formButtonPrimary: 'bg-blue-600 hover:bg-blue-700 text-white',
                formButtonSecondary: 'border border-slate-300 hover:bg-slate-50',
                card: 'shadow-none',
              },
            }}
            routing="path"
            path="/sign-up"
          />
        </div>
      </div>
    </div>
  )
}
