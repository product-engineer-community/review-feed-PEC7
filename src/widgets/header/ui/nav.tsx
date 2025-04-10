import { Logo } from '@/shared/ui/Logo';

export const Nav = () => {
  return (
    <nav className="fixed left-0 right-0 top-0 z-50 bg-[#1a237e] px-4 py-3 text-white">
      <div className="mx-auto flex max-w-2xl items-center justify-between">
        <Logo />
      </div>
    </nav>
  );
};
