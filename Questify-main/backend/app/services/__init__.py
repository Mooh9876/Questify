# Dieser Ordner enthält die gesamte Spiellogik des Backends.
# Er ist aufgeteilt in vier Bereiche: Profil, Belohnungen, Streak und Inhalte.
# Durch diese Datei können alle anderen Teile des Servers einfach auf die Logik zugreifen,
# ohne wissen zu müssen, in welcher Unterdatei sie steckt.

"""
Services package — re-exports all public symbols for backwards-compatible imports.

Submodules:
  profile  — UserProfile CRUD + serialization
  rewards  — Coin reward generation + application
  streak   — Daily streak + joker logic
  content  — AI content data, XP helpers, motivation messages
"""

from .profile import DEFAULT_PROFILE_ID, get_or_create_profile, serialize_profile
from .rewards import GeneratedReward, generate_coin_reward, apply_reward, serialize_reward
from .streak import StreakResult, update_streak
from .content import (
    SUGGESTION_MAP,
    MOTIVATION_MESSAGES,
    rewrite_task_title,
    suggest_xp,
    calculate_total_xp,
    calculate_level,
    motivation_for_task,
)

__all__ = [
    'DEFAULT_PROFILE_ID',
    'get_or_create_profile',
    'serialize_profile',
    'GeneratedReward',
    'generate_coin_reward',
    'apply_reward',
    'serialize_reward',
    'StreakResult',
    'update_streak',
    'SUGGESTION_MAP',
    'MOTIVATION_MESSAGES',
    'rewrite_task_title',
    'suggest_xp',
    'calculate_total_xp',
    'calculate_level',
    'motivation_for_task',
]
