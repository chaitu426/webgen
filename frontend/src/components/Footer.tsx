

export function Footer() {
  return (
    <>
      {/* Static Footer */}
      <footer className="w-full bg-#0A0A0A text-neutral-400 py-6 ">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
          {/* Left: Branding */}
          <div className="text-lg font-medium tracking-wide lowercase">
            <span className="text-white font-jetbrains">WEBGEN</span> labs.
          </div>

          {/* Right: Links and Copyright */}
          <div className="flex flex-wrap gap-4 text-sm items-center justify-center">
            <a href="#" className="hover:text-white transition">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-white transition">
              Terms of Service
            </a>
            <span className="opacity-70 font-jetbrains">Copyright © Webgenlabs {new Date().getFullYear()}</span>
          </div>
        </div>
      </footer>

    </>
  );
}

