import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-6 overflow-hidden relative">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-blue-50 opacity-80" />
        <div className="absolute -bottom-24 -left-24 w-80 h-80 rounded-full bg-blue-100 opacity-60" />
        <svg
          className="absolute inset-0 w-full h-full opacity-[0.03]"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern
              id="grid"
              width="60"
              height="60"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 60 0 L 0 0 0 60"
                fill="none"
                stroke="#1d4ed8"
                strokeWidth="1"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div className="relative z-10 text-center max-w-lg mx-auto">
        <div className="relative mb-6">
          <span
            className="text-[10rem] sm:text-[14rem] font-black leading-none select-none"
            style={{
              background:
                "linear-gradient(135deg, #dbeafe 0%, #93c5fd 40%, #3b82f6 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              fontFamily: "'Georgia', serif",
              letterSpacing: "-0.05em",
            }}
          >
            404
          </span>
        </div>

        <div className="flex items-center justify-center gap-3 mb-6">
          <div className="h-px w-16 bg-blue-200" />
          <div className="w-2 h-2 rounded-full bg-blue-400" />
          <div className="h-px w-16 bg-blue-200" />
        </div>

        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-3">
          Page Not Found
        </h1>

        <p className="text-gray-500 text-base mb-10 leading-relaxed">
          The page you&apos;re looking for doesn&apos;t exist or has been moved
          somewhere else.
        </p>

        <Link
          href="/"
          className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-white font-semibold text-sm transition-all duration-300 hover:shadow-lg hover:shadow-blue-200 hover:-translate-y-0.5"
          style={{
            background:
              "linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)",
          }}
        >
          <svg
            className="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
            />
          </svg>
          Back to Home
        </Link>
      </div>
    </div>
  );
}