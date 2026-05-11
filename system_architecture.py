"""
System Architecture — Modular Task Framework
Author: Leif William Sogge
Purpose: Provide a scalable, low‑load, high‑complexity task architecture
         for modular systems, creative ecosystems, and ceremonial workflows.
"""

# ------------------------------------------------------------
# 🧩 1. Modular Task Architecture
# ------------------------------------------------------------

class Module:
    """A container for conceptual clusters, not individual tasks."""
    def __init__(self, name):
        self.name = name
        self.clusters = {}

    def add_cluster(self, cluster_name, notes=None):
        self.clusters[cluster_name] = notes or {}

    def __repr__(self):
        return f"<Module {self.name}: {list(self.clusters.keys())}>"

MODULES = {
    "Creation": Module("Creation"),
    "Editing": Module("Editing"),
    "Management": Module("Management"),
    "Execution": Module("Execution"),
    "Review": Module("Review"),
    "Archive": Module("Archive")
}


# ------------------------------------------------------------
# 🔄 2. Phase-Based Workflow
# ------------------------------------------------------------

PHASES = {
    0: "Intake",
    1: "Structuring",
    2: "Development",
    3: "Execution",
    4: "Review",
    5: "Archive"
}

class PhaseTask:
    """A single task representing a whole phase."""
    def __init__(self, phase_id, description=""):
        self.phase = PHASES[phase_id]
        self.description = description

    def __repr__(self):
        return f"<PhaseTask {self.phase}>"



# ------------------------------------------------------------
# 🏛️ 3. Meta-Task Hierarchy
# ------------------------------------------------------------

class MetaTask:
    """Tiered structure: Meta-Task → Cluster → Notes → Actions."""
    def __init__(self, title):
        self.title = title
        self.clusters = {}

    def add_cluster(self, name, notes=None):
        self.clusters[name] = notes or {}

    def __repr__(self):
        return f"<MetaTask {self.title}: {list(self.clusters.keys())}>"



# ------------------------------------------------------------
# 🪢 4. Spine-Based Structure
# ------------------------------------------------------------

SPINE = {
    "Root": "Master System",
    "Branches": [
        "Modules",
        "Phases",
        "Meta-Tasks",
        "Workflows",
        "Archives"
    ]
}



# ------------------------------------------------------------
# 🧠 5. Thinking-Layer Map
# ------------------------------------------------------------

THINKING_LAYERS = {
    1: "Conceptual",
    2: "Structural",
    3: "Behavioral",
    4: "Operational",
    5: "Reflective"
}



# ------------------------------------------------------------
# 🧭 6. Task Manager Workflow
# ------------------------------------------------------------

def task_manager_steps():
    return [
        "Open the Master System task.",
        "Navigate to the Module you need.",
        "Work inside the module’s notes or sub-sections.",
        "Only create a new task if it’s a Phase, Meta-Task, or Milestone.",
        "Archive completed items into the Archive Module."
    ]



# ------------------------------------------------------------
# ✏️ 7. Task Editor Workflow
# ------------------------------------------------------------

def task_editor_steps():
    return [
        "Open the relevant Meta-Task.",
        "Edit the content inside the task body.",
        "Update the Phase if needed.",
        "Move the task to the next module if it changes state.",
        "Only create a new task if the structure itself changes."
    ]



# ------------------------------------------------------------
# 🛠️ 8. Task Creator Workflow
# ------------------------------------------------------------

def task_creator_rules():
    return [
        "Create one task per module.",
        "Create one task per phase.",
        "Create one task per meta-task.",
        "Never create tasks for details — store those inside the task body.",
        "Use clusters, not individual items."
    ]



# ------------------------------------------------------------
# 🗂️ 9. Categorized Task Folder System
# ------------------------------------------------------------

FOLDER_SYSTEM = {
    "01 - Creation": ["Sparks", "Drafts", "Concepts"],
    "02 - Editing": ["Revisions", "Updates", "Rewrites"],
    "03 - Management": ["Meta-Tasks", "Modules", "Phases"],
    "04 - Execution": ["Active", "Pending", "Blocked"],
    "05 - Review": ["Completed", "Needs Revision", "Needs Expansion"],
    "06 - Archive": ["Retired", "Legacy", "Versioned"]
}



# ------------------------------------------------------------
# Utility: Pretty Print System Overview
# ------------------------------------------------------------

def system_overview():
    return {
        "Modules": list(MODULES.keys()),
        "Phases": PHASES,
        "Spine": SPINE,
        "Thinking Layers": THINKING_LAYERS,
        "Folder System": FOLDER_SYSTEM
    }


if __name__ == "__main__":
    print("System Architecture Loaded.")
    print(system_overview())
