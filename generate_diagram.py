#!/usr/bin/env python3
"""
Generate a visual diagram of the React Visibility Service Architecture
"""

import matplotlib.pyplot as plt
import matplotlib.patches as patches
from matplotlib.patches import FancyBboxPatch, ConnectionPatch
import numpy as np

# Set up the figure with high DPI for better quality
plt.rcParams['figure.dpi'] = 300
plt.rcParams['savefig.dpi'] = 300
fig, ax = plt.subplots(1, 1, figsize=(16, 12))
ax.set_xlim(0, 16)
ax.set_ylim(0, 12)
ax.axis('off')

# Colors
colors = {
    'react': '#61dafb',
    'visibility': '#ff6b6b', 
    'state_machine': '#4ecdc4',
    'core_observer': '#45b7d1',
    'api': '#f9ca24',
    'text': '#2c3e50',
    'border': '#34495e'
}

# Title
ax.text(8, 11.5, 'React Visibility Service Architecture', 
        fontsize=24, fontweight='bold', ha='center', color=colors['text'])

# React Components Section
ax.text(2, 10.5, 'React Components', fontsize=16, fontweight='bold', 
        color=colors['text'], ha='center')

# Component boxes
component_box = FancyBboxPatch((0.5, 9.5), 3, 0.8, 
                              boxstyle="round,pad=0.1", 
                              facecolor=colors['react'], 
                              edgecolor=colors['border'], linewidth=2)
ax.add_patch(component_box)
ax.text(2, 9.9, 'Component', fontsize=12, ha='center', fontweight='bold')

# Hook boxes
hook_box = FancyBboxPatch((0.5, 8.5), 3, 0.8, 
                          boxstyle="round,pad=0.1", 
                          facecolor=colors['react'], 
                          edgecolor=colors['border'], linewidth=2)
ax.add_patch(hook_box)
ax.text(2, 8.9, 'useVisibility Hook', fontsize=12, ha='center', fontweight='bold')

handler_box = FancyBboxPatch((0.5, 7.5), 3, 0.8, 
                            boxstyle="round,pad=0.1", 
                            facecolor=colors['react'], 
                            edgecolor=colors['border'], linewidth=2)
ax.add_patch(handler_box)
ax.text(2, 7.9, 'VisibilityHandler', fontsize=12, ha='center', fontweight='bold')

watch_box = FancyBboxPatch((0.5, 6.5), 3, 0.8, 
                          boxstyle="round,pad=0.1", 
                          facecolor=colors['react'], 
                          edgecolor=colors['border'], linewidth=2)
ax.add_patch(watch_box)
ax.text(2, 6.9, 'useWatch Hook', fontsize=12, ha='center', fontweight='bold')

# Visibility Instance Section
ax.text(8, 10.5, 'Visibility Instance', fontsize=16, fontweight='bold', 
        color=colors['text'], ha='center')

instance_box = FancyBboxPatch((6.5, 9.5), 3, 0.8, 
                             boxstyle="round,pad=0.1", 
                             facecolor=colors['visibility'], 
                             edgecolor=colors['border'], linewidth=2)
ax.add_patch(instance_box)
ax.text(8, 9.9, 'VisibilityInstance', fontsize=12, ha='center', fontweight='bold')

# State Machine
state_box = FancyBboxPatch((6.5, 8.5), 3, 0.8, 
                           boxstyle="round,pad=0.1", 
                           facecolor=colors['state_machine'], 
                           edgecolor=colors['border'], linewidth=2)
ax.add_patch(state_box)
ax.text(8, 8.9, 'State Machine', fontsize=12, ha='center', fontweight='bold')

# States
open_state = FancyBboxPatch((5.5, 7.5), 2, 0.6, 
                            boxstyle="round,pad=0.05", 
                            facecolor=colors['state_machine'], 
                            edgecolor=colors['border'], linewidth=1)
ax.add_patch(open_state)
ax.text(6.5, 7.8, 'State: open', fontsize=10, ha='center')

close_state = FancyBboxPatch((8.5, 7.5), 2, 0.6, 
                             boxstyle="round,pad=0.05", 
                             facecolor=colors['state_machine'], 
                             edgecolor=colors['border'], linewidth=1)
ax.add_patch(close_state)
ax.text(9.5, 7.8, 'State: close', fontsize=10, ha='center')

# API Methods
api_box = FancyBboxPatch((6.5, 6.5), 3, 0.8, 
                         boxstyle="round,pad=0.1", 
                         facecolor=colors['api'], 
                         edgecolor=colors['border'], linewidth=2)
ax.add_patch(api_box)
ax.text(8, 6.9, 'API Methods', fontsize=12, ha='center', fontweight='bold')

# API method details
open_method = FancyBboxPatch((5.5, 5.5), 1.8, 0.6, 
                             boxstyle="round,pad=0.05", 
                             facecolor=colors['api'], 
                             edgecolor=colors['border'], linewidth=1)
ax.add_patch(open_method)
ax.text(6.4, 5.8, 'open()', fontsize=10, ha='center')

close_method = FancyBboxPatch((7.2, 5.5), 1.8, 0.6, 
                              boxstyle="round,pad=0.05", 
                              facecolor=colors['api'], 
                              edgecolor=colors['border'], linewidth=1)
ax.add_patch(close_method)
ax.text(8.1, 5.8, 'close()', fontsize=10, ha='center')

reset_method = FancyBboxPatch((8.9, 5.5), 1.8, 0.6, 
                              boxstyle="round,pad=0.05", 
                              facecolor=colors['api'], 
                              edgecolor=colors['border'], linewidth=1)
ax.add_patch(reset_method)
ax.text(9.8, 5.8, 'reset()', fontsize=10, ha='center')

# State Machine Engine Section
ax.text(13, 10.5, 'State Machine Engine', fontsize=16, fontweight='bold', 
        color=colors['text'], ha='center')

engine_box = FancyBboxPatch((11.5, 9.5), 3, 0.8, 
                            boxstyle="round,pad=0.1", 
                            facecolor=colors['state_machine'], 
                            edgecolor=colors['border'], linewidth=2)
ax.add_patch(engine_box)
ax.text(13, 9.9, '@scoped-observer/react-state-machine', fontsize=10, ha='center', fontweight='bold')

create_box = FancyBboxPatch((11.5, 8.5), 3, 0.8, 
                            boxstyle="round,pad=0.1", 
                            facecolor=colors['state_machine'], 
                            edgecolor=colors['border'], linewidth=2)
ax.add_patch(create_box)
ax.text(13, 8.9, 'createMachine', fontsize=12, ha='center', fontweight='bold')

transitions_box = FancyBboxPatch((11.5, 7.5), 3, 0.8, 
                                boxstyle="round,pad=0.1", 
                                facecolor=colors['state_machine'], 
                                edgecolor=colors['border'], linewidth=2)
ax.add_patch(transitions_box)
ax.text(13, 7.9, 'State Transitions', fontsize=12, ha='center', fontweight='bold')

# Core Observer Section
ax.text(8, 4.5, 'Core Observer System', fontsize=16, fontweight='bold', 
        color=colors['text'], ha='center')

core_box = FancyBboxPatch((6.5, 3.5), 3, 0.8, 
                          boxstyle="round,pad=0.1", 
                          facecolor=colors['core_observer'], 
                          edgecolor=colors['border'], linewidth=2)
ax.add_patch(core_box)
ax.text(8, 3.9, '@scoped-observer/core', fontsize=12, ha='center', fontweight='bold')

observer_box = FancyBboxPatch((5.5, 2.5), 2, 0.6, 
                              boxstyle="round,pad=0.05", 
                              facecolor=colors['core_observer'], 
                              edgecolor=colors['border'], linewidth=1)
ax.add_patch(observer_box)
ax.text(6.5, 2.8, 'ScopedObserver', fontsize=10, ha='center')

entity_box = FancyBboxPatch((8.5, 2.5), 2, 0.6, 
                            boxstyle="round,pad=0.05", 
                            facecolor=colors['core_observer'], 
                            edgecolor=colors['border'], linewidth=1)
ax.add_patch(entity_box)
ax.text(9.5, 2.8, 'EventEntity', fontsize=10, ha='center')

events_box = FancyBboxPatch((6.5, 1.5), 3, 0.8, 
                            boxstyle="round,pad=0.1", 
                            facecolor=colors['core_observer'], 
                            edgecolor=colors['border'], linewidth=2)
ax.add_patch(events_box)
ax.text(8, 1.9, 'Event Management', fontsize=12, ha='center', fontweight='bold')

# Arrows showing data flow
# Component to Visibility Instance
arrow1 = ConnectionPatch((3.5, 9.9), (6.5, 9.9), "data", "data",
                        arrowstyle="->", shrinkA=5, shrinkB=5, 
                        mutation_scale=20, fc=colors['border'], lw=2)
ax.add_patch(arrow1)

# Visibility Instance to State Machine
arrow2 = ConnectionPatch((8, 8.5), (8, 8.5), "data", "data",
                        arrowstyle="->", shrinkA=5, shrinkB=5, 
                        mutation_scale=20, fc=colors['border'], lw=2)
ax.add_patch(arrow2)

# State Machine to Engine
arrow3 = ConnectionPatch((9.5, 8.9), (11.5, 8.9), "data", "data",
                        arrowstyle="->", shrinkA=5, shrinkB=5, 
                        mutation_scale=20, fc=colors['border'], lw=2)
ax.add_patch(arrow3)

# Visibility Instance to Core Observer
arrow4 = ConnectionPatch((8, 6.5), (8, 3.5), "data", "data",
                        arrowstyle="->", shrinkA=5, shrinkB=5, 
                        mutation_scale=20, fc=colors['border'], lw=2)
ax.add_patch(arrow4)

# State transitions
# open to close
arrow5 = ConnectionPatch((6.5, 7.2), (8.5, 7.2), "data", "data",
                        arrowstyle="->", shrinkA=5, shrinkB=5, 
                        mutation_scale=15, fc=colors['border'], lw=1.5)
ax.add_patch(arrow5)
ax.text(7.5, 7.0, 'ON_CLOSE', fontsize=9, ha='center', color=colors['text'])

# close to open
arrow6 = ConnectionPatch((8.5, 7.8), (6.5, 7.8), "data", "data",
                        arrowstyle="->", shrinkA=5, shrinkB=5, 
                        mutation_scale=15, fc=colors['border'], lw=1.5)
ax.add_patch(arrow6)
ax.text(7.5, 8.0, 'ON_OPEN', fontsize=9, ha='center', color=colors['text'])

# API connections
arrow7 = ConnectionPatch((6.4, 5.5), (6.5, 7.2), "data", "data",
                        arrowstyle="->", shrinkA=5, shrinkB=5, 
                        mutation_scale=15, fc=colors['border'], lw=1.5)
ax.add_patch(arrow7)

arrow8 = ConnectionPatch((8.1, 5.5), (8.5, 7.2), "data", "data",
                        arrowstyle="->", shrinkA=5, shrinkB=5, 
                        mutation_scale=15, fc=colors['border'], lw=1.5)
ax.add_patch(arrow8)

arrow9 = ConnectionPatch((9.8, 5.5), (8.5, 7.2), "data", "data",
                        arrowstyle="->", shrinkA=5, shrinkB=5, 
                        mutation_scale=15, fc=colors['border'], lw=1.5)
ax.add_patch(arrow9)

# Add legend
legend_elements = [
    patches.Patch(color=colors['react'], label='React Components'),
    patches.Patch(color=colors['visibility'], label='Visibility Instance'),
    patches.Patch(color=colors['state_machine'], label='State Machine'),
    patches.Patch(color=colors['core_observer'], label='Core Observer'),
    patches.Patch(color=colors['api'], label='API Methods')
]

ax.legend(handles=legend_elements, loc='upper right', bbox_to_anchor=(0.98, 0.98))

# Add data flow description
ax.text(0.5, 0.8, 'Data Flow: Component → useVisibility → VisibilityInstance → State Machine → Core Observer', 
        fontsize=12, fontweight='bold', color=colors['text'])

ax.text(0.5, 0.5, 'Key Features: Scoped Management, State Persistence, Event System, Type Safety, Memory Management', 
        fontsize=10, color=colors['text'])

plt.tight_layout()
plt.savefig('visibility_service_diagram.png', bbox_inches='tight', dpi=300, facecolor='white')
plt.show()

print("✅ Diagram saved as 'visibility_service_diagram.png'")