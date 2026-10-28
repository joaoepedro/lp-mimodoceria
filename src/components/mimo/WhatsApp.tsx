import { createContext, useCallback, useContext, useState, type ReactNode } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { config } from "@/config";

const Ctx = createContext<(mensagem: string) => void>(() => {});
export const useWhatsApp = () => useContext(Ctx);

export function WhatsAppProvider({ children }: { children: ReactNode }) {
  const [msg, setMsg] = useState<string | null>(null);
  const abrirWhatsApp = useCallback((mensagem: string) => {
    const numero = config.contato.whatsapp;
    if (numero) {
      window.open(`https://wa.me/${numero}?text=${encodeURIComponent(mensagem)}`, "_blank", "noopener");
    } else setMsg(mensagem);
  }, []);
  return (
    <Ctx.Provider value={abrirWhatsApp}>
      {children}
      <Dialog.Root open={msg !== null} onOpenChange={(o) => !o && setMsg(null)}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 z-50 bg-cacau/60 data-[state=open]:animate-in data-[state=open]:fade-in-0" />
          <Dialog.Content className="fixed left-1/2 top-1/2 z-50 w-[calc(100%-32px)] max-w-md -translate-x-1/2 -translate-y-1/2 rounded-[24px] bg-pistache p-7 text-cacau">
            <span className="inline-block rounded-full bg-rosa px-3 py-1 text-xs font-bold tracking-[0.15em] text-rosa-texto">
              MODO DEMONSTRAÇÃO
            </span>
            <Dialog.Title className="mt-4 text-[28px] font-extrabold leading-tight">Aqui abriria o WhatsApp</Dialog.Title>
            <Dialog.Description className="mt-2 text-[15px] text-cacau-suave">
              Projeto conceitual. Com o número da loja cadastrado, o cliente cai direto na conversa com esta mensagem pronta:
            </Dialog.Description>
            <p className="mt-5 rounded-[16px_16px_4px_16px] bg-balao p-4 text-[15px] text-balao-texto">{msg}</p>
            <Dialog.Close className="btn-primario mt-6 w-full">Entendi</Dialog.Close>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </Ctx.Provider>
  );
}
