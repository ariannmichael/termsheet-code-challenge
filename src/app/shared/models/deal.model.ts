export interface Deal {
 id: number;
 name: string;
 type: DealType;
 purchasePrice: number;
 address: string;
 noi: number;
 capRate: number;
 image: string;
}

export type DealType = 'Acquisition' | 'Lease' | 'Development';