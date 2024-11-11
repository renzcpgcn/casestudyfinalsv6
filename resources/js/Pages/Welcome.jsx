import { Head, Link } from '@inertiajs/react';

export default function Welcome({ auth, laravelVersion, phpVersion }) {
    const handleImageError = () => {
        document
            .getElementById('screenshot-container')
            ?.classList.add('!hidden');
        document.getElementById('docs-card')?.classList.add('!row-span-1');
        document
            .getElementById('docs-card-content')
            ?.classList.add('!flex-row');
        document.getElementById('background')?.classList.add('!hidden');
    };

    return (
        <>
            <Head title="Welcome" />
            <div className="bg-gray-50 text-black/50 dark:bg-black dark:text-white/50">
                <img
                    id="background"
                    className="absolute -left-20 top-0 max-w-[877px]"
                    src="https://laravel.com/assets/img/welcome/background.svg"
                />
                <div className="relative flex min-h-screen flex-col items-center justify-center selection:bg-[#FF2D20] selection:text-white">
                    <div className="relative w-full max-w-2xl px-6 lg:max-w-7xl">
                        <header className="grid grid-cols-2 items-center gap-2 py-10 lg:grid-cols-3">

                            <div className="flex lg:col-start-2 lg:justify-center">
                                <svg

                                    width="60"
                                    height="60"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                >
                                    <rect x="2" y="2" width="8" height="8" fill="red" />
                                    <rect x="14" y="2" width="8" height="8" fill="red" />
                                    <rect x="2" y="14" width="8" height="8" fill="red" />
                                    <rect x="14" y="17" width="8" height="2" fill="red" />
                                    <rect x="17" y="14" width="2" height="8" fill="red" />
                                </svg>
                            </div>
                            

                            <nav className="-mx-3 flex flex-1 justify-end">
                                {auth.user ? (
                                    <Link
                                        href={route('dashboard')}
                                        className="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"
                                    >
                                        Product Dashboard
                                    </Link>
                                ) : (
                                    <>
                                        <Link
                                            href={route('login')}
                                            className="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:outline hover:outline-red-500  focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"
                                        >
                                            Log in
                                        </Link>
                                        <Link
                                            href={route('register')}
                                            className="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:outline hover:outline-red-500 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"
                                        >
                                            Register
                                        </Link>
                                    </>
                                )}
                            </nav>
                        </header>

                        <main className="mt-6">
                                
                            <div className="flex flex-col items-start gap-6 overflow-hidden rounded-lg bg-white p-6 shadow-[0px_14px_34px_0px_rgba(0,0,0,0.08)] ring-1 ring-white/[0.05] transition duration-300 focus:outline-none focus-visible:ring-[#FF2D20] md:row-span-3 lg:p-10 lg:pb-10 dark:bg-zinc-900 dark:ring-zinc-800 "
                            >
                                <div className="relative flex items-center gap-6 lg:items-end">
                                    <div
                                        id="docs-card-content"
                                        className="flex items-start gap-6 lg:flex-col"
                                    >
                                        <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-[#FF2D20]/10 sm:size-20">
                                            <svg
                                                width="60"
                                                height="60"
                                                viewBox="0 0 24 24"
                                                fill="white"
                                                >
                                                <rect x="2" y="2" width="8" height="8" fill="white" />
                                                <rect x="14" y="2" width="8" height="8" fill="white" />
                                                <rect x="2" y="14" width="8" height="8" fill="white" />
                                                <rect x="14" y="17" width="8" height="2" fill="red" />
                                                <rect x="17" y="14" width="2" height="8" fill="red" />
                                            </svg>
                                        </div>

                                        <div className="pt-3 sm:pt-5 lg:pt-0">
                                            <h1 className="text-xl font-semibold text-black dark:text-white">
                                                Welcome to Listify!
                                            </h1>

                                            <p className="mt-4 text-sm/relaxed">
                                                Welcome to Listify, the ultimate solution for 
                                                managing your products efficiently and effectively.
                                                Our user-friendly platform is designed to help your
                                                add, update, delete, and search for products with ease.
                                                Whether you're a small business owner, a project manager,
                                                or a larger team, Listify has the tools you needed to 
                                                take control of your product catalog.
                                            </p>
                                        </div>
                                    </div>

                                    
                                </div>
                            </div>
                        </main>

                        <footer className="py-16 text-center text-sm text-black dark:text-white/70">
                            <p>Product Management System</p>
                        </footer>
                    </div>
                </div>
            </div>
        </>
    );
}