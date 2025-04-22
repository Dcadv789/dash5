export const calculateVariation = (currentValue: number, previousValue: number) => {
  if (previousValue === 0) return { percentage: 0, isPositive: true };
  const variation = ((currentValue - previousValue) / previousValue) * 100;
  return {
    percentage: Math.abs(variation).toFixed(1),
    isPositive: variation >= 0
  };
};

export const calculateIndicatorValue = async (
  indicatorId: string,
  month: string,
  year: number,
  processedIndicators: Set<string> = new Set()
): Promise<number> => {
  if (processedIndicators.has(indicatorId)) {
    console.warn('Circular reference detected in indicator:', indicatorId);
    return 0;
  }
  processedIndicators.add(indicatorId);

  try {
    // Implementation here...
    return 0;
  } catch (err) {
    console.error('Error calculating indicator value:', err);
    return 0;
  }
};