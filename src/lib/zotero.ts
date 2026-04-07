const ZOTERO_API_BASE = 'https://api.zotero.org';

export interface ZoteroItem {
  key: string;
  version: number;
  data: {
    itemType: string;
    title: string;
    creators: Array<{ firstName: string; lastName: string; creatorType: string }>;
    date: string;
    publicationTitle?: string;
    volume?: string;
    issue?: string;
    pages?: string;
    DOI?: string;
    ISBN?: string;
    url?: string;
    abstractNote?: string;
  };
  meta: {
    creatorSummary: string;
    parsedDate: string;
  };
}

export const fetchZoteroItems = async (userId: string, apiKey: string) => {
  const response = await fetch(`${ZOTERO_API_BASE}/users/${userId}/items?format=json&limit=50`, {
    headers: {
      'Zotero-API-Key': apiKey,
    },
  });
  
  if (!response.ok) {
    throw new Error('Failed to fetch Zotero items');
  }
  
  return await response.json() as ZoteroItem[];
};

export const getCitationString = (item: ZoteroItem) => {
  const author = item.meta.creatorSummary || 'Unknown Author';
  const year = item.meta.parsedDate ? new Date(item.meta.parsedDate).getFullYear() : 'n.d.';
  return `(${author}, ${year})`;
};

export const getFullBibliographyEntry = (item: ZoteroItem) => {
  const creators = item.data.creators.map(c => `${c.lastName}, ${c.firstName}`).join('; ');
  const title = item.data.title;
  const date = item.data.date || 'n.d.';
  const pub = item.data.publicationTitle || '';
  return `${creators} (${date}). "${title}." ${pub}.`;
};
