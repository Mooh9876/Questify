# Diese Datei kümmert sich um das Spielerprofil.
# Sie speichert Dinge wie Münzen, Streaks und Joker des Spielers.
# Wenn noch kein Profil existiert, wird hier automatisch eines erstellt.

from __future__ import annotations

from ..models import UserProfile

DEFAULT_PROFILE_ID = 'player-1'


def get_or_create_profile(db) -> UserProfile:
    profile = db.get(UserProfile, DEFAULT_PROFILE_ID)
    if profile is None:
        profile = UserProfile(id=DEFAULT_PROFILE_ID, coins=0)
        db.add(profile)
        db.flush()
    return profile


def serialize_profile(profile: UserProfile) -> dict:
    return {
        'id': profile.id,
        'coins': profile.coins,
        'streak': profile.streak,
        'jokers': profile.jokers,
    }
