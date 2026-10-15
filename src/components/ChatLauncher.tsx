import { lazy, Suspense, useState } from "react";
import { MessageCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const Chatbot = lazy(() => import("./Chatbot").then((module) => ({ default: module.Chatbot })));

export const ChatLauncher = () => {
  const [requested, setRequested] = useState(false);
  const launcher = (pending: boolean) => (
    <Button size="icon" aria-label="Open chat" disabled={pending} onClick={() => setRequested(true)} className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-50 w-14 h-14 sm:w-16 sm:h-16 rounded-full shadow-elegant">
      {pending ? <Loader2 className="animate-spin" /> : <MessageCircle />}
    </Button>
  );
  return requested ? <Suspense fallback={launcher(true)}><Chatbot initiallyOpen /></Suspense> : launcher(false);
};