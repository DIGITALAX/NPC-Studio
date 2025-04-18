import { AccessControlConditions } from "@lit-protocol/types";
import { DecodedMessage } from "@xmtp/browser-sdk";
import { RefObject, SetStateAction } from "react";
import { Catalogo, Coleccion } from "../../Common/types/common.types";

export interface EncryptedDetails {
  ciphertext: string;
  dataToEncryptHash: string;
  chain: string;
  accessControlConditions: AccessControlConditions;
}

export interface Pedido {
  total: string;
  orderId: string;
  blockNumber: string;
  blockTimestamp: string;
  transactionHash: string;
  fulfillment?: Details | EncryptedDetails;
  subOrders: SubOrder[];
  decrypted: boolean;
}

export interface SubOrder {
  color?: string;
  tamano?: string;
  amount: number;
  currency: string;
  mintedTokenIds: string[];
  fulfiller: string;
  designer: string;
  fulfillerAmount: number;
  designerAmount: number;
  total: number;
  collectionId: number;
  autographType: string;
  collection: Coleccion | Catalogo;
}

export interface Details {
  nombre: string;
  account: string;
  direccion: string;
  zip: string;
  ciudad: string;
  estado: string;
  pais: string;
}

export type ConversacionProps = {
  mensaje: string;
  setMensaje: (e: SetStateAction<string>) => void;
  enviarMensaje: () => Promise<void>;
  mensajeCargando: boolean;
  conversacion: DecodedMessage<any>[];
  conversacionCargando: boolean;
  address: `0x${string}` | undefined;
  dict: any;
  mensajeRef: RefObject<HTMLVideoElement | null>;
};
