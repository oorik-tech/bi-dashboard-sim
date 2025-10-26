export function Footer() {
  return (
    <footer className="border-t bg-background py-6">
      <div className="container px-6">
        <div className="flex flex-col items-center justify-between gap-4 text-sm text-muted-foreground md:flex-row">
          <p>© {new Date().getFullYear()} oorIk Technologies. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-foreground transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-foreground transition-colors">
              EULA
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
