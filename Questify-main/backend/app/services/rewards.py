# Diese Datei berechnet und vergibt Belohnungen (Münzen) für abgeschlossene Quests.
# Wenn der Spieler eine Aufgabe erledigt, wird hier ausgerechnet, wie viele Münzen er bekommt.
# Die Münzen werden dann dem Profil des Spielers gutgeschrieben.

from __future__ import annotations

from dataclasses import dataclass

from ..models import UserProfile


@dataclass(frozen=True)
class GeneratedReward:
    type: str
    title: str
    description: str
    coins: int = 0


def generate_coin_reward(task_xp: int) -> GeneratedReward:
    coins = max(1, round(task_xp / 10))
    return GeneratedReward(
        type='coins',
        title=f'+{coins} Coin' if coins == 1 else f'+{coins} Coins',
        description='Quest abgeschlossen. Neben XP bekommst du direkt Coins gutgeschrieben.',
        coins=coins,
    )


def apply_reward(profile: UserProfile, reward: GeneratedReward) -> UserProfile:
    profile.coins += reward.coins
    return profile


def serialize_reward(reward: GeneratedReward) -> dict:
    return {
        'type': reward.type,
        'title': reward.title,
        'description': reward.description,
        'coins': reward.coins,
    }
