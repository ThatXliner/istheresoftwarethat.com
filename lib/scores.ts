/**
 * Voting & Rating Aggregation System for Free Software Catalog
 *
 * High-Level Design and Reasoning:
 *
 * This system combines two types of mutually exclusive (users can only do one or the other)
 * user feedback to produce a single, meaningful score per software:
 * 1) Upvotes/Downvotes: Simple binary feedback allowing quick, low-friction interaction.
 *    - Each upvote counts +1, each downvote counts -1.
 *    - Scores are normalized (up over down) across the catalog to keep results comparable (that way we aren&apos;t comparing the amount of votes but instead the ratio).
 * 2) Star Ratings + Written Reviews: Higher-effort, nuanced feedback.
 *    - Stars range from 1 to 5, but we map them to a zero-centered scale [-1, +1] so low stars decrease the score,
 *      3 stars are neutral, and high stars increase it.
 *    - Each star rating is weighted by the reviewer's karma, reflecting trustworthiness.
 *
 * Final Score Calculation:
 * - Combines normalized net votes and weighted zero-centered star scores.
 * - Star ratings carry a heavier weight to reflect their richer, more trustworthy feedback.
 * - Formula: final_score = (upvote_weight * normalized_net_votes) + (star_weight * weighted_star_score)
 *
 * Additional Notes:
 * - Normalizing votes avoids domination by highly voted entries, ensuring fairness.
 * - Weights (upvote_weight, star_weight) are configurable parameters.
 * - The system can be extended with time decay, minimum vote thresholds, or other signals.
 * - This implementation expects input data in the shape of software objects with counts and arrays of star reviews.
 *
 * Edge Cases:
 * - When no star ratings exist, the star component contributes 0 to the final score.
 * - When max net votes across catalog is zero (e.g., fresh catalog), votes component defaults to 0.
 *
 * This design balances volume and quality, letting casual users influence via votes and invested users influence more through reviews.
 */

// TODO: before using this, refactor the app so "upvotes" don&apos;t exist on the table but instead all user feedback are are in the review table thing

import type { Software } from "./components/common/data";

function normalize(value: number, maxAbs: number) {
  if (maxAbs === 0) return 0;
  // Clamp between -1 and 1 after normalization
  const normalized = value / maxAbs;
  return Math.max(-1, Math.min(1, normalized));
}

function starToZeroCentered(star: number) {
  // Map star ratings 1-5 to [-1, +1], where 3 is neutral
  return (star - 3) / 2;
}

/**
 * Compute weighted average of zero-centered star ratings
 * @param {Array<{star: number, karma: number}>} starReviews
 * @returns {number} weighted average in [-1, +1]
 */
function computeWeightedStarScore(
  starReviews: Array<{ star: number; karma: number }>,
) {
  if (!starReviews || starReviews.length === 0) return 0;

  let weightedSum = 0;
  let totalKarma = 0;

  for (const review of starReviews) {
    const weight = review.karma > 0 ? review.karma : 1; // default karma=1 if missing/invalid
    weightedSum += starToZeroCentered(review.star) * weight;
    totalKarma += weight;
  }

  return totalKarma === 0 ? 0 : weightedSum / totalKarma;
}

/**
 * Compute normalized net votes for one software entry
 * @param {number} upvotes
 * @param {number} downvotes
 * @param {number} maxNetVotesInCatalog
 * @returns {number} normalized net votes in [-1, +1]
 */
function computeNormalizedNetVotes(
  upvotes: number,
  downvotes: number,
  maxNetVotesInCatalog: number,
) {
  const netVotes = upvotes - downvotes;
  return normalize(netVotes, maxNetVotesInCatalog);
}
function sum(x: number[]) {
  return x.reduce((acc, val) => acc + val, 0);
}
/**
 * Compute final aggregated score for one software entry
 * @param {Software} software - software data object
 * @param {Array<{star: number, karma: number}>} software.star_reviews
 * @param {number} maxNetVotesInCatalog - maximum absolute net votes of any software entry in the catalog
 * @param {number} upvoteWeight - weight multiplier for votes (e.g., 1)
 * @param {number} starWeight - weight multiplier for star ratings (e.g., 4)
 * @returns {number} final aggregated score (can be outside [-1,1] depending on weights)
 */
export function computeFinalScore(
  software: Software,
  maxNetVotesInCatalog: number,
  upvoteWeight = 1,
  starWeight = 4,
) {
  const votesComponent = computeNormalizedNetVotes(
    sum(software.reviews.map((review) => (review.is_upvote === true ? 1 : 0))),
    sum(software.reviews.map((review) => (review.is_upvote === false ? 1 : 0))),
    maxNetVotesInCatalog,
  );

  const starComponent = computeWeightedStarScore(
    software.reviews
      .filter((review) => review.stars !== null)
      .map((review) => ({ star: review.stars, karma: 1 })),
  );

  return upvoteWeight * votesComponent + starWeight * starComponent;
}

// // Example usage:

// // Assume this is max absolute net votes across your catalog, precomputed:
// const maxNetVotesInCatalog = 150; // example number

// const softwareExample = {
//   upvotes_count: 120,
//   downvotes_count: 30,
//   star_reviews: [
//     { star: 5, karma: 10 },
//     { star: 3, karma: 2 },
//     { star: 1, karma: 1 },
//     { star: 4, karma: 5 },
//   ],
// };

// const finalScore = computeFinalScore(softwareExample, maxNetVotesInCatalog);
// console.log("Final aggregated score:", finalScore);
