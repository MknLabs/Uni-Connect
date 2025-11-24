import { Suspense } from 'react';
import AuthForm from "@/components/Loginpage/AuthForm";
import { DottedMapComponent } from "@/components/Loginpage/DottedMap";
import { Logo } from "@/components/ui/Logo";
import { SectionHeader, SectionSubHeader } from "@/components/ui/SectionHeader";

export default function Login() {
    return (
        <div className="flex min-h-screen font-sans">
            <div className="hidden lg:flex lg:w-1/2 bg-gray-50 p-12 flex-col items-start">
                <Logo className="mb-8" />
                <div className="py-10 flex flex-col gap-2">
                    <SectionHeader as="h1" className="leading-normal">
                        Intelligent
                        <span className="text-orange-500"> Campus</span>
                        <br />
                        Powered by
                        <span className="text-orange-500"> Context AI </span>
                        and
                        <br />
                        <span className="text-orange-500"> Vector Database</span>
                    </SectionHeader>
                    <SectionSubHeader className="max-w-lg">
                        Experience seamless academic management with our AI-driven platform. Automate assignments, streamline grading, and discover resources instantly with smart semantic search.
                    </SectionSubHeader>
                    <DottedMapComponent />
                </div>
            </div>
            <div className="flex-1 flex flex-col items-center justify-center py-4 px-6">
                <Logo className="lg:hidden mb-8" />
                <Suspense fallback={<div className="text-orange-500">Loading...</div>}>
                    <AuthForm />
                </Suspense>
            </div>
        </div>
    );
}
