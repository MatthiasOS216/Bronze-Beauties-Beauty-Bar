// Real Google reviews, quoted verbatim. Shown visibly only. No review schema
// markup, because Google ignores self-serving LocalBusiness review stars.
// (The legacy facial review described a former team member, so it was retired.)
export type Review = { quote: string; author: string; service: string; source: 'Google review' };

export const reviews: Review[] = [
  {
    quote:
      'Samantha did the spray tan so efficiently and it turned out beautiful. I look like I came back from a much needed vacation! That glow! She is the only one I’ll be using from now on for spray tans!',
    author: 'Amanda R.',
    service: 'Organic spray tan',
    source: 'Google review',
  },
];
