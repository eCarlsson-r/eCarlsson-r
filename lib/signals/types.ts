export interface SignalScores {
    execution: number;
    complexity: number;
    ownership: number;
}

export interface SignalSummary {
    executionLevel: string;
    complexityLevel: string;
    ownershipLevel: string;
}

export interface ProjectSignals {
    id: string;
    scores: SignalScores;
    summary: SignalSummary;
}