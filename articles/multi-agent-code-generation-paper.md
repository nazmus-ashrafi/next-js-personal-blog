---
title: "Enhancing LLM Code Generation: Multi-Agent Collaboration and Runtime Debugging"
category: "Paper on LLM Code Generation"
date: "18-12-2024"
---

## Publication Overview

**Authors**: N. Ashrafi, S. Bouktif, M. Mediani

**Venue**: IEEE International Conference on Artificial Intelligence and Communication Technologies (AICT) 2025

**DOI**: [10.1109/AICT67988.2025.11268754](https://doi.org/10.1109/AICT67988.2025.11268754)

**arXiv**: [2505.02133](https://arxiv.org/abs/2505.02133)

---

## Abstract

Large language models (LLMs) have shown promising capabilities in code generation; however, they still face challenges in producing correct solutions for non-trivial programming tasks. To enhance LLM code generation performance, this paper investigates the combination of two complementary inference-time strategies: multi-agent collaboration and runtime execution-based debugging. We conduct an extensive empirical study evaluating the proposed framework across 19 diverse LLMs using two established coding benchmarks, with functional accuracy as the primary measure of code quality.

Our results demonstrate that the combined approach outperforms both the baseline one-shot prompting method and the individual strategies when applied independently. In particular, on the HumanEval benchmark, our framework achieves an average accuracy of 64.82% across 19 LLMs, compared to 56.48% achieved by the basic one-shot prompting approach. It also surpasses the standalone multi-agent collaboration strategy by more than 7.66%. Moreover, our empirical analysis indicates that optimal performance gains are achieved when the two individual strategies operate at comparable effectiveness levels.

The proposed framework can be readily integrated into existing development pipelines, enhancing the reliability of automated code generation while maintaining reasonable generation speeds. This makes it a practical and scalable solution for improving code generation quality in enterprise environments.


---

## Citation

```bibtex
@inproceedings{ashrafi2025enhancing,
  title={Enhancing LLM Code Generation: A Systematic Evaluation of Multi-Agent Collaboration and Runtime Debugging},
  author={Ashrafi, N. and Bouktif, S. and Mediani, M.},
  booktitle={Proceedings of the 2025 IEEE International Conference on Artificial Intelligence and Communication Technologies (AICT)},
  year={2025},
  organization={IEEE},
  doi={10.1109/AICT67988.2025.11268754}
}
```

## Access

- **IEEE Xplore**: [Full Paper](https://ieeexplore.ieee.org/document/11268754)
- **arXiv Preprint**: [arXiv:2505.02133](https://arxiv.org/abs/2505.02133)
