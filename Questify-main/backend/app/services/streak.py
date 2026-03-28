# Diese Datei verwaltet den Streak (die Tages-Serie) des Spielers.
# Sie prüft, ob der Spieler heute schon aktiv war, und erhöht oder resetet den Streak.
# Joker können eingesetzt werden, um einen Streak zu retten, wenn man einen Tag verpasst hat.

from __future__ import annotations

from datetime import date

from ..models import UserProfile


class StreakResult:
    def __init__(self, joker_used: bool = False, streak_milestone: int | None = None):
        self.joker_used = joker_used
        self.streak_milestone = streak_milestone


def update_streak(profile: UserProfile) -> StreakResult:
    """Update streak on task completion. Returns info about joker usage and milestones."""
    today = date.today()
    last = profile.last_activity_date
    joker_used = False
    did_increment = False
    prev_streak = profile.streak

    if last is None:
        profile.streak = 1
        did_increment = True
    elif last == today:
        pass  # Already counted today — no change
    else:
        days_gap = (today - last).days
        if days_gap == 1:
            profile.streak += 1
            did_increment = True
        else:
            if profile.jokers > 0:
                profile.jokers -= 1
                profile.streak += 1
                joker_used = True
                did_increment = True
            else:
                profile.streak = 1
                did_increment = True

    profile.last_activity_date = today

    # Award a joker at every 7-day streak milestone
    streak_milestone = None
    if did_increment and profile.streak > 0 and profile.streak % 7 == 0:
        if prev_streak < profile.streak:
            profile.jokers += 1
            streak_milestone = profile.streak

    return StreakResult(joker_used=joker_used, streak_milestone=streak_milestone)
