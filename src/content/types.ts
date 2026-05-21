// Shared shapes for the content folder.
//
// One Step per file under steps/. Each Step has a prototype track (what
// appears on screen in the iPad deck) and a PDF track (what appears in the
// downloadable PDF). PDF tracks not yet written are the literal string 'tbd';
// PDF tracks that intentionally do not apply (transitions, terminal steps)
// are 'not-applicable'. These string sentinels match the language used in
// value-add-source-of-truth.md.

export type StepType = 'content' | 'transition';

export type PdfTrack =
  | 'tbd'
  | 'not-applicable'
  | Record<string, unknown>;

export interface Step {
  readonly step: number;
  readonly name: string;
  readonly type: StepType;
  readonly section: number | null;
  readonly prototype: Record<string, unknown>;
  readonly pdf: PdfTrack;
  // Optional draft block for PDF copy that exists in code but has not yet
  // been canonicalized in value-add-source-of-truth.md. When source of
  // truth gets the copy, move the block into `pdf` and remove this field.
  readonly pdfReserved?: Record<string, unknown>;
}
