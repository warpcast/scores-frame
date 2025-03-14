import React from "react";

import { ApiCreatorRewardsLeaderboardUser } from "@/lib/api";
import { cn } from "@/lib/cn";
import {
  useCreatorRewards,
  useCreatorRewardsLeaderboard,
  useCreatorRewardsPayoutEligibilityForUser,
  useCreatorRewardsPeriodSummary,
} from "@/lib/queries";
import { useFrameContext } from "@/providers/FrameContextProvider";

import { Card } from "../ui/card";
import { List } from "../ui/list";
import { ScoreSummaryRow } from "./scoreSummaryRow";

function RewardsLeaderboard() {
  const { fid, triggerViewProfile } = useFrameContext();

  const { data: creatorRewardsPeriodSummary } = useCreatorRewardsPeriodSummary({
    fid,
  });

  const { data: creatorRewardsData } = useCreatorRewards({ fid });

  const { data, fetchNextPage, isLoading, isFetchingNextPage } =
    useCreatorRewardsLeaderboard();

  const { data: creatorRewardsPayoutEligibility } =
    useCreatorRewardsPayoutEligibilityForUser({ fid });

  const viewerScores = React.useMemo(() => {
    return creatorRewardsData.result.scores;
  }, [creatorRewardsData.result.scores]);

  const leaderboard = React.useMemo(() => {
    return data?.pages.flatMap((page) => page.result.leaderboard.users) || [];
  }, [data?.pages]);

  const exclusion = React.useMemo(() => {
    return creatorRewardsPeriodSummary.result.summary.exclusion;
  }, [creatorRewardsPeriodSummary.result.summary]);

  const isGeoRestricted = React.useMemo(() => {
    return creatorRewardsPayoutEligibility.result.eligibility.isGeoRestricted;
  }, [creatorRewardsPayoutEligibility.result.eligibility.isGeoRestricted]);

  const renderItem = React.useCallback(
    ({ item }: { index: number; item: ApiCreatorRewardsLeaderboardUser }) => {
      const viewerRow = item.user.fid === fid;

      return (
        <ScoreSummaryRow
          user={item.user}
          rank={item.rank}
          score={item.score}
          className={cn(
            item.rank !== 1 && "border-t",
            viewerRow && "bg-secondary",
            viewerRow && item.rank === 1 && "rounded-t-lg",
            viewerRow && exclusion && "opacity-25"
          )}
          onClick={triggerViewProfile}
        />
      );
    },
    [exclusion, fid, triggerViewProfile]
  );

  const keyExtractor = React.useCallback(
    (item: ApiCreatorRewardsLeaderboardUser) => {
      return item.user.fid.toString();
    },
    []
  );

  return (
    <div className="flex flex-col gap-4">
      {typeof viewerScores.currentPeriodRank !== "undefined" &&
        !isGeoRestricted && (
          <Card>
            <ScoreSummaryRow
              user={viewerScores.user}
              rank={viewerScores.currentPeriodRank}
              score={viewerScores.currentPeriodScore}
              className={cn(exclusion && "opacity-25")}
              onClick={() => {
                // Kinda probably weird to trigger this on self row click but
                // let's do it anyway so its a consistent experience.
                triggerViewProfile({ fid: viewerScores.user.fid });
              }}
            />
          </Card>
        )}
      <Card className="max-h-128">
        <List
          data={leaderboard}
          keyExtractor={keyExtractor}
          renderItem={renderItem}
          emptyView={
            <div className="text-center text-muted w-full py-4">
              Leaderboard will be updated soon
            </div>
          }
          isFetchingNextPage={isLoading || isFetchingNextPage}
          onEndReached={fetchNextPage}
        />
      </Card>
    </div>
  );
}

export { RewardsLeaderboard };
