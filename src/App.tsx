import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  Activity, Brain, Heart, Zap, Database, Download,
  GitMerge, Layers, Settings, Github,
  BookOpen, Code, FileText, Share2, Network, ArrowRight,
  ExternalLink, Globe, LineChart, Search, X, ShieldCheck, Radio,
  Cpu, Waves, Stethoscope, FlaskConical, Footprints, ClipboardCheck,
  Gauge, BrainCircuit, FileChartColumn
} from 'lucide-react';

type Language = 'ja' | 'en';

const CATEGORIES = [
  { id: 'all', ja: 'すべて', en: 'All' },
  { id: 'foundation', ja: '基盤', en: 'Foundation' },
  { id: 'signals', ja: '信号解析', en: 'Signal Analysis' },
  { id: 'movement', ja: '運動・筋骨格', en: 'Movement & MSK' },
  { id: 'platform', ja: 'データ・統合', en: 'Data & Integration' },
  { id: 'clinical', ja: '臨床研究', en: 'Clinical Research' },
];

type PackageDescription = { ja: string; en: string };

const packageEntry = (
  name: string,
  categoryId: string,
  icon: React.ComponentType<{ className?: string }>,
  desc: PackageDescription,
  overrides: { url?: string; docsUrl?: string; lang?: 'R' | 'Python' } = {},
) => ({
  name,
  categoryId,
  icon,
  desc,
  lang: 'R' as 'R' | 'Python',
  url: `https://github.com/x-biosignal/${name}`,
  docsUrl: `https://x-biosignal.r-universe.dev/${name}`,
  ...overrides,
});

const packages = [
  packageEntry('PhysioExperiment', 'foundation', FileText,
    { ja: '4つの基盤パッケージを読み込む統合インターフェースとGUI/RESTランチャー。', en: 'Umbrella interface for four foundation packages, with GUI and REST launchers.' }),
  packageEntry('PhysioCore', 'foundation', Database,
    { ja: '生体信号のS4データモデル、イベント、プロベナンス、操作レジストリ。', en: 'S4 biosignal data model, events, provenance, and operation registries.' }),
  packageEntry('PhysioIO', 'foundation', Download,
    { ja: 'EDF、BDF、BIDS、HDF5、WFDB、データベースなどの入出力。', en: 'I/O for EDF, BDF, BIDS, HDF5, WFDB, databases, and related formats.' }),
  packageEntry('PhysioPreprocess', 'foundation', Settings,
    { ja: 'フィルタ、リサンプリング、アーティファクト処理、ICA。', en: 'Filtering, resampling, artifact handling, and ICA.' }),
  packageEntry('PhysioAnalysis', 'foundation', LineChart,
    { ja: '時間周波数、結合性、ネットワーク、統計、可視化。', en: 'Time-frequency, connectivity, network, statistics, and visualization.' }),

  packageEntry('PhysioEEG', 'signals', Brain,
    { ja: 'ERP、時間周波数、結合性、源推定を含む脳波解析。', en: 'EEG analysis including ERP, time-frequency, connectivity, and source methods.' }),
  packageEntry('PhysioEMG', 'signals', Activity,
    { ja: '筋電図の振幅、疲労、オンセット、筋シナジー解析。', en: 'EMG amplitude, fatigue, onset, and muscle-synergy analysis.' }),
  packageEntry('PhysioHDEMG', 'signals', Gauge,
    { ja: '高密度表面筋電図の運動単位分解。', en: 'Motor-unit decomposition for high-density surface EMG.' }),
  packageEntry('PhysioECG', 'signals', Heart,
    { ja: 'R波検出、心拍変動、臨床ECG解析。', en: 'R-peak detection, heart-rate variability, and clinical ECG analysis.' }),
  packageEntry('PhysioEDA', 'signals', Zap,
    { ja: '皮膚電気活動の分解、SCR検出、イベント関連解析。', en: 'EDA decomposition, SCR detection, and event-related analysis.' }),
  packageEntry('PhysioNIRS', 'signals', Waves,
    { ja: 'SNIRF入出力、MBLL、品質管理、短距離チャネル補正。', en: 'SNIRF I/O, MBLL, quality control, and short-separation correction.' }),
  packageEntry('PhysioNeurophys', 'signals', BrainCircuit,
    { ja: 'TMS、末梢運動神経生理、TMS-EEG解析。', en: 'TMS, peripheral motor neurophysiology, and TMS-EEG analysis.' }),
  packageEntry('PhysioHeadModels', 'signals', Layers,
    { ja: 'EEG頭部モデルと順方向計算。', en: 'Realistic EEG head models and forward solvers.' }),

  packageEntry('PhysioMoCap', 'movement', Footprints,
    { ja: 'モーションキャプチャ、歩行、運動学・運動力学解析。', en: 'Motion capture, gait, kinematics, and kinetics analysis.' }),
  packageEntry('PoseFixeR', 'movement', Footprints,
    { ja: 'OpenPose 姿勢推定の歩行解析における異常検出・補正（骨長・関節角・左右脚swap・信頼度）と補間・平滑。', en: 'Anomaly detection and correction for OpenPose gait analysis (segment length, joint angle, left/right leg swaps, confidence) with interpolation and smoothing.' }),
  packageEntry('PhysioOpenSim', 'movement', Cpu,
    { ja: 'OpenSimツールへのネイティブ連携。', en: 'Native integration with OpenSim tools.' }),
  packageEntry('PhysioMSKNet', 'movement', Network,
    { ja: '筋骨格ネットワークとリハビリテーション解析。', en: 'Musculoskeletal network and rehabilitation analysis.' }),
  packageEntry('synergyMixR', 'movement', Layers,
    { ja: '混合モデルに基づく筋シナジー解析（MFA/MPCA）。クラスタ分離を考慮したシナジー数推定とモデル選択。', en: 'Mixture-model-based muscle synergy analysis (MFA/MPCA); synergy-number estimation and model selection accounting for cluster separation.' }),
  packageEntry('PhysioGaitNorm', 'movement', Footprints,
    { ja: '歩行の標準値データベースと参照モデル。', en: 'Normative gait database and reference models.' }),

  packageEntry('PhysioCrossModal', 'platform', GitMerge,
    { ja: '複数モダリティ間の同期、結合性、相互作用解析。', en: 'Synchronization, coupling, and interaction analysis across modalities.' }),
  packageEntry('PhysioNetPhysiology', 'platform', Network,
    { ja: '臓器間の動的相互作用ネットワーク解析（Network Physiology）。時間遅延安定性（TDS）で心臓・脳・呼吸・筋の結合を検出。', en: 'Network Physiology: dynamic organ-interaction networks. Time Delay Stability (TDS) detects coupling among heart, brain, respiration, and muscle.' }),
  packageEntry('PhysioDevices', 'platform', Radio,
    { ja: 'ウェアラブル・研究室機器データの取り込み。', en: 'Ingestion for wearable and laboratory acquisition systems.' }),
  packageEntry('PhysioWearable', 'platform', Gauge,
    { ja: '自由生活下のウェアラブル加速度計解析。', en: 'Free-living wearable accelerometry.' }),
  packageEntry('PhysioStream', 'platform', Radio,
    { ja: '統治されたリアルタイムストリームとバイオフィードバック。', en: 'Governed real-time streams and biofeedback.' }),
  packageEntry('PhysioML', 'platform', Cpu,
    { ja: 'リークを防ぐ生理時系列機械学習。', en: 'Leakage-aware machine learning for physiological time series.' }),
  packageEntry('PhysioAnnotationHub', 'platform', Share2,
    { ja: '解剖・臨床オントロジーと知識グラフ。', en: 'Anatomical and clinical ontologies and knowledge graph.' }),
  packageEntry('PhysioLake', 'platform', Database,
    { ja: 'バージョン管理されたオンディスク・データレイク。OmicsLake連携でスナップショット・データセット系譜・実行バンドルを保存。', en: 'Versioned on-disk data lake integrating with OmicsLake — snapshots, dataset lineage, and run-bundle storage.' }),
  packageEntry('PhysioPipe', 'platform', Network,
    { ja: '再現可能な targets パイプライン集（ECG/EEG/EMG/EDA、コホート分岐、Quartoレポート）。CLI+Parquetでオーケストレータ非依存。', en: 'Reproducible targets pipeline collection (ECG/EEG/EMG/EDA, cohort branching, Quarto reports); orchestrator-agnostic via CLI + Parquet.' }),
  packageEntry('PhysioAppKit', 'platform', Layers,
    { ja: '単一事例(N-of-1)解析の領域中立エンジン。NAP効果量・閾値判定・順序→区間のRasch・位相プロットを応用レイヤーへ提供。', en: 'Domain-neutral single-case (N-of-1) engine: NAP effect size, threshold verdicts, ordinal-to-interval Rasch, and phase plots for application layers.' }),
  packageEntry('PhysioRecipes', 'platform', FlaskConical,
    { ja: '公開データで完結する再現可能な解析ケーススタディの版付きDB（Quartoギャラリー）。', en: 'Versioned database of reproducible, self-contained analysis case studies on public data (Quarto gallery).' }),
  packageEntry('PhysioTwin', 'platform', Cpu,
    { ja: '生理・運動系のデジタルツイン・シミュレーションとデータ同化。力学/生理/ネットワーク生成器・センサ模擬・状態空間/ベイズ較正で、実測から個別化した in silico 実験を実行。', en: 'Digital-twin simulation and data assimilation for physiological and movement systems: mechanistic, physiological, and network generators, sensor emulation, and state-space/Bayesian calibration for personalised in-silico experiments.' }),
  packageEntry('physiopy', 'platform', Cpu,
    { ja: 'Python 側エコシステム（データモデル・信号アダプタ・ML/ONNX・NWB）。CLI+ParquetでR側と相互運用。', en: 'Python side of the ecosystem (data model, signal adapters, ML/ONNX, NWB); interoperates with the R side via CLI + Parquet.' },
    { lang: 'Python', docsUrl: 'https://x-biosignal.github.io/physiopy/' }),

  packageEntry('PhysioTrial', 'clinical', FlaskConical,
    { ja: '臨床試験の無作為化、割付隠蔽、盲検化。', en: 'Clinical-trial randomization, allocation concealment, and blinding.' }),
  packageEntry('PhysioClinStats', 'clinical', Stethoscope,
    { ja: '生体信号研究の臨床推論と推定。', en: 'Clinical inference and estimands for physiological signal studies.' }),
  packageEntry('PhysioClinical', 'clinical', ClipboardCheck,
    { ja: '臨床アウトカム、変化量、レスポンダー解析。', en: 'Clinical outcomes, change scores, and responder analysis.' }),
  packageEntry('PhysioRehab', 'clinical', Footprints,
    { ja: 'ICFネイティブの単一事例臨床推論ツール。目標参照アウトカム・SCED変化検出・ICF構造の経過記録自動生成をリハビリ向けに。', en: 'ICF-native single-case clinical-reasoning tools for rehabilitation: goal-referenced outcomes, single-case change detection, and auto-drafted ICF-structured progress notes.' }),
  packageEntry('PhysioCompliance', 'clinical', ShieldCheck,
    { ja: '証拠、プライバシー、データライフサイクル管理。', en: 'Evidence, privacy, and data-lifecycle controls.' }),
  packageEntry('PhysioReport', 'clinical', FileChartColumn,
    { ja: '臨床レポートと縦断ダッシュボード生成。', en: 'Clinical reports and longitudinal dashboard generation.' }),
];

const WORKFLOW_PACKAGES = [
  ['PhysioCore', 'PhysioIO', 'PhysioDevices'],
  ['PhysioPreprocess', 'PhysioStream'],
  ['PhysioEEG', 'PhysioECG', 'PhysioEMG', 'PhysioNIRS', 'PhysioMoCap'],
  ['PhysioCrossModal', 'PhysioClinStats', 'PhysioTrial', 'PhysioReport'],
];

const DOC_URLS = [
  'https://github.com/x-biosignal/PhysioExperiment#quick-start',
  'https://x-biosignal.r-universe.dev/packages',
  'https://github.com/x-biosignal/PhysioExperiment/blob/main/SUPPORT.md',
  'https://github.com/x-biosignal/PhysioExperiment/blob/main/GOVERNANCE.md',
  'https://github.com/x-biosignal/PhysioExperiment/blob/main/CONTRIBUTING.md',
  'https://github.com/x-biosignal/PhysioExperiment#citation',
  'https://github.com/x-biosignal/mcp-server-biosignal',
  'https://x-biosignal.github.io/PhysioRecipes/',
];

const DOC_ICONS = [Code, BookOpen, ShieldCheck, Network, GitMerge, FileText, Search, FlaskConical];

const t = {
  ja: {
    nav: { start: 'はじめる', workflow: '解析フロー', packages: 'パッケージ', docs: 'ドキュメント', mcp: 'MCP' },
    hero: {
      vertical: '生体信号を、紐解く。',
      subtitle: 'Open-Source Tools for Comprehensive\nBiosignal Analysis',
      desc: 'リハビリテーション・臨床研究のための包括的な生体信号解析エコシステム。取得から前処理、信号・運動解析、統計推論、レポートまでを一貫したデータモデルで接続し、R パッケージ群に加え Python 側 (physiopy) を CLI+Parquet で相互運用します。',
      btnPackages: 'パッケージ一覧を見る',
      btnInstall: 'インストール方法',
      statusR: 'R: 37パッケージ公開済',
      statusPython: 'Python: physiopy 公開済み',
      statusNextflow: 'Nextflow: PhysioPipe 経由',
    },
    start: {
      title: 'ここからはじめる',
      subtitle: '導入、選択、実行の順に一次情報へ進めます。',
      steps: [
        { title: '1. 環境へ導入', desc: 'r-universe から R パッケージを、GitHub から Python (physiopy) を導入します。', action: 'インストールを見る' },
        { title: '2. 解析目的を選ぶ', desc: '信号、運動、デバイス、臨床研究から必要なモジュールを選びます。', action: '解析フローを見る' },
        { title: '3. 最小例を実行', desc: '共通データモデルを使うQuick Startを実行します。', action: 'Quick Startを開く' },
      ],
    },
    workflow: {
      title: '研究のための、一貫した解析フロー',
      subtitle: 'モジュール化されたパッケージ群が、シームレスなデータパイプラインを構築します。',
      steps: [
        { title: '入出力・基盤', desc: '多様な生体信号フォーマットを共通のデータ構造へ読み込みます。' },
        { title: '前処理', desc: 'アーティファクト除去やフィルタリングでデータをクリーンに保ちます。' },
        { title: 'モダリティ解析', desc: 'EEG, ECG, EMGなど、各信号に特化した特徴量抽出を行います。' },
        { title: '統合・臨床応用', desc: '複数モダリティの統合、臨床統計、機械学習、レポートへ接続します。' },
      ]
    },
    packages: {
      title: 'パッケージ一覧',
      subtitle: '37の公開パッケージを目的に応じて組み合わせて使用できます。',
      githubLink: 'GitHubで見る',
      docsLink: 'ドキュメント',
      searchPlaceholder: 'パッケージやドキュメントを検索...',
      noResults: '条件に一致するパッケージが見つかりませんでした。'
    },
    docs: {
      title: 'ドキュメント',
      subtitle: '実装、利用、支援、研究再現性に必要な一次情報をまとめています。',
      open: '開く',
      links: [
        { title: 'Quick Start', desc: '共通データモデルの作成から前処理・解析までの最小例。' },
        { title: '関数リファレンス', desc: '37パッケージの関数、ビネット、ビルド状況を横断して参照。' },
        { title: 'サポート', desc: '質問、バグ報告、セキュリティ問題の適切な連絡先。' },
        { title: 'ガバナンス', desc: 'プロジェクト範囲、意思決定、メンテナンス方針。' },
        { title: 'コントリビューション', desc: '開発環境、テスト、変更提案の要件。' },
        { title: '引用', desc: 'ソフトウェアを研究成果で引用するためのメタデータ。' },
        { title: 'MCPサーバー', desc: '37パッケージと公開関数を横断検索する機械可読カタログ。' },
        { title: '再現事例 (PhysioRecipes)', desc: '公開データで完結する再現可能な解析事例集。各数値は成果物にトレースし、レシピはbyte-identicalに再実行できます。' },
      ],
    },
    mcp: {
      title: 'MCPによるパッケージ探索',
      subtitle: 'パッケージの説明、モダリティ、依存関係、1,400以上の公開関数を標準プロトコルから検索できます。',
      source: 'MCPサーバーを開く',
      machine: '機械可読ガイド',
      features: [
        { title: '37パッケージ', desc: '公開レジストリと一致する完全なカタログ。' },
        { title: '関数横断検索', desc: 'DESCRIPTIONとNAMESPACEから生成。' },
        { title: '用途別推薦', desc: '信号、運動、臨床研究の目的から候補を提示。' },
      ],
    },
    install: {
      title: 'インストール',
      subtitle: 'r-universeから簡単にインストールできます。',
      pythonSubtitle: 'Python側 (physiopy) を公開しました。ドキュメント公開済み、PyPI 公開は準備中です。',
      nextflowSubtitle: '再現可能な Nextflow パイプラインは PhysioPipe から利用できます。',
      comment1: '# x-biosignalのr-universeリポジトリを有効化',
      comment2: '# 統合インターフェースをインストール',
      pythonComment1: '# Python側 physiopy（ドキュメント公開済み）',
      pythonComment2: '# PyPI 公開は準備中／現在は GitHub から',
      nextflowComment1: '# Nextflow は PhysioPipe（R）から利用可能',
      nextflowComment2: '# CLI+Parquet 契約で R/Python ステップを実行',
      runiverseLink: 'r-universeのページを見る'
    }
  },
  en: {
    nav: { start: 'Start', workflow: 'Workflow', packages: 'Packages', docs: 'Docs', mcp: 'MCP' },
    hero: {
      vertical: '生体信号解読',
      subtitle: 'Open-Source Tools for Comprehensive\nBiosignal Analysis',
      desc: 'A comprehensive biosignal-analysis ecosystem for rehabilitation and clinical research, connecting acquisition, preprocessing, signal and movement analysis, statistical inference, and reporting through one data model — R packages plus a Python side (physiopy), interoperable via CLI + Parquet.',
      btnPackages: 'View Packages',
      btnInstall: 'How to Install',
      statusR: 'R: 37 packages released',
      statusPython: 'Python: physiopy published',
      statusNextflow: 'Nextflow: via PhysioPipe',
    },
    start: {
      title: 'Start here',
      subtitle: 'Move from installation to package selection and a working example.',
      steps: [
        { title: '1. Set up your environment', desc: 'Install the R packages from r-universe, or the Python side (physiopy) from GitHub.', action: 'View installation' },
        { title: '2. Choose a workflow', desc: 'Select modules for signals, movement, devices, or clinical research.', action: 'View workflows' },
        { title: '3. Run the minimal example', desc: 'Use the Quick Start built around the shared data model.', action: 'Open Quick Start' },
      ],
    },
    workflow: {
      title: 'Consistent Workflow for Research',
      subtitle: 'Modular packages build a seamless data pipeline.',
      steps: [
        { title: 'Core & I/O', desc: 'Load various biosignal formats into a common data structure.' },
        { title: 'Preprocessing', desc: 'Keep data clean with artifact removal and filtering.' },
        { title: 'Modality Analysis', desc: 'Extract features specific to EEG, ECG, EMG, EDA, and more.' },
        { title: 'Integration & Clinical', desc: 'Connect multimodal integration, clinical statistics, machine learning, and reporting.' },
      ]
    },
    packages: {
      title: 'Packages',
      subtitle: 'Combine 37 public packages according to your research needs.',
      githubLink: 'View on GitHub',
      docsLink: 'Documentation',
      searchPlaceholder: 'Search packages or documentation...',
      noResults: 'No packages found matching your search.'
    },
    docs: {
      title: 'Documentation',
      subtitle: 'Primary sources for implementation, use, support, and reproducible research.',
      open: 'Open',
      links: [
        { title: 'Quick Start', desc: 'A minimal path from the shared data model to preprocessing and analysis.' },
        { title: 'Function reference', desc: 'Functions, vignettes, and build status across all 37 packages.' },
        { title: 'Support', desc: 'The right channels for questions, bug reports, and security concerns.' },
        { title: 'Governance', desc: 'Project scope, decision making, and maintenance policy.' },
        { title: 'Contributing', desc: 'Development setup, tests, and requirements for proposed changes.' },
        { title: 'Citation', desc: 'Metadata for citing the software in research outputs.' },
        { title: 'MCP server', desc: 'Machine-readable discovery across 37 packages and their public functions.' },
        { title: 'Reproducible cases (PhysioRecipes)', desc: 'A gallery of self-contained, reproducible analyses on public data — every number traces to an artifact and each recipe replays byte-identically.' },
      ],
    },
    mcp: {
      title: 'Package discovery through MCP',
      subtitle: 'Search package descriptions, modalities, dependencies, and more than 1,400 public functions through a standard protocol.',
      source: 'Open MCP server',
      machine: 'Machine-readable guide',
      features: [
        { title: '37 packages', desc: 'A complete catalog aligned with the public registry.' },
        { title: 'Function search', desc: 'Generated from DESCRIPTION and NAMESPACE.' },
        { title: 'Task matching', desc: 'Ranked choices for signal, movement, and clinical workflows.' },
      ],
    },
    install: {
      title: 'Installation',
      subtitle: 'Easily installable from r-universe.',
      pythonSubtitle: 'The Python side (physiopy) is published — docs are live; a PyPI release is pending.',
      nextflowSubtitle: 'Reproducible Nextflow pipelines are available via PhysioPipe.',
      comment1: '# Enable x-biosignal r-universe repository',
      comment2: '# Install the umbrella interface',
      pythonComment1: '# Python side (physiopy) — docs published',
      pythonComment2: '# PyPI release pending; install from GitHub for now',
      nextflowComment1: '# Nextflow is available via PhysioPipe (R)',
      nextflowComment2: '# runs R/Python steps via the CLI + Parquet contract',
      runiverseLink: 'View on r-universe'
    }
  }
};

export default function App() {
  const [lang, setLang] = useState<Language>('en');
  const [activeCategoryId, setActiveCategoryId] = useState('all');
  const [installTab, setInstallTab] = useState<'R' | 'Python' | 'Nextflow'>('R');
  const [searchQuery, setSearchQuery] = useState('');

  const currentT = t[lang];

  const filteredPackages = packages.filter(p => {
    const matchesCategory = activeCategoryId === 'all' || p.categoryId === activeCategoryId;
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.desc[lang].toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const toggleLang = () => setLang(prev => prev === 'ja' ? 'en' : 'ja');

  return (
    <div className="min-h-screen flex flex-col selection:bg-[var(--color-kin)] selection:text-white">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-[var(--color-washi)]/90 backdrop-blur-md border-b border-[var(--color-sumi)]/10">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Activity className="w-6 h-6 text-[var(--color-accent)]" />
            <span className="font-serif font-bold text-xl">x-biosignal</span>
          </div>
          <div className="flex items-center gap-4 md:gap-6 text-sm font-medium">
            <div className="hidden lg:flex items-center gap-6 mr-4">
              <a href="#start" className="hover:text-[var(--color-accent)] transition-colors">{currentT.nav.start}</a>
              <a href="#workflow" className="hover:text-[var(--color-accent)] transition-colors">{currentT.nav.workflow}</a>
              <a href="#packages" className="hover:text-[var(--color-accent)] transition-colors">{currentT.nav.packages}</a>
              <a href="#docs" className="hover:text-[var(--color-accent)] transition-colors">{currentT.nav.docs}</a>
              <a href="#mcp" className="hover:text-[var(--color-accent)] transition-colors">{currentT.nav.mcp}</a>
            </div>
            <a href="https://github.com/x-biosignal" target="_blank" rel="noreferrer" className="flex items-center gap-1 hover:text-[var(--color-accent)] transition-colors">
              <Github className="w-4 h-4" />
              <span className="hidden sm:inline">GitHub</span>
            </a>
            <button
              onClick={toggleLang}
              className="flex items-center gap-1 bg-[var(--color-sumi)]/5 hover:bg-[var(--color-sumi)]/10 px-3 py-1.5 rounded-full transition-colors"
            >
              <Globe className="w-4 h-4 text-[var(--color-accent)]" />
              <span className="font-mono text-xs font-bold">{lang.toUpperCase()}</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="concept" className="relative pt-24 md:pt-32 pb-20 md:pb-24 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 relative z-10 flex flex-col md:flex-row items-center gap-12">
          {/* Vertical Accent Text */}
          <div className="hidden md:block absolute left-0 top-0 h-full">
            <div className="vertical-rl text-4xl font-serif text-[var(--color-sumi)]/10 font-bold h-full flex items-center">
              {currentT.hero.vertical}
            </div>
          </div>

          <div className="flex-1 md:pl-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-5xl md:text-7xl font-serif font-bold text-[var(--color-sumi)] leading-tight mb-6">
                <span className="text-[var(--color-accent)]">x-biosignal</span><br />
                <span className="text-2xl md:text-4xl text-[var(--color-nibiiro)] mt-4 block font-normal whitespace-pre-line">
                  {currentT.hero.subtitle}
                </span>
              </h1>
              <p className="text-base md:text-lg text-[var(--color-sumi)]/80 mb-10 max-w-2xl leading-relaxed">
                {currentT.hero.desc}
              </p>

              <div className="flex flex-wrap gap-4 mb-8">
                <a href="#packages" className="inline-flex items-center gap-2 bg-[var(--color-accent)] text-white px-6 md:px-8 py-3 md:py-4 rounded-sm hover:bg-[var(--color-accent)]/90 transition-colors font-medium">
                  {currentT.hero.btnPackages}
                  <ArrowRight className="w-4 h-4" />
                </a>
                <a href="#getting-started" className="inline-flex items-center gap-2 bg-transparent border border-[var(--color-sumi)] text-[var(--color-sumi)] px-6 md:px-8 py-3 md:py-4 rounded-sm hover:bg-[var(--color-sumi)]/5 transition-colors font-medium">
                  <Code className="w-4 h-4" />
                  {currentT.hero.btnInstall}
                </a>
              </div>

              <div className="inline-flex flex-wrap items-center justify-center gap-x-3 gap-y-2 bg-white border border-[var(--color-sumi)]/10 shadow-sm rounded-xl md:rounded-full px-4 py-2 text-sm font-medium">
                <div className="flex items-center gap-2 text-[var(--color-accent)]">
                  <span className="w-2 h-2 rounded-full bg-green-500"></span>
                  {currentT.hero.statusR}
                </div>
                <div className="w-[1px] h-4 bg-[var(--color-sumi)]/20 hidden md:block"></div>
                <div className="flex items-center gap-2 text-[var(--color-sumi)]/60">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--color-kin)] opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--color-kin)]"></span>
                  </span>
                  {currentT.hero.statusPython}
                </div>
                <div className="w-[1px] h-4 bg-[var(--color-sumi)]/20 hidden md:block"></div>
                <div className="flex items-center gap-2 text-[var(--color-sumi)]/50">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--color-matsu)] opacity-60"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--color-matsu)]"></span>
                  </span>
                  {currentT.hero.statusNextflow}
                </div>
              </div>
            </motion.div>
          </div>

          <div className="hidden md:block flex-1 relative w-full mt-10 md:mt-0">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="wafu-border p-6 md:p-8 bg-[var(--color-washi)] max-w-lg mx-auto flex items-center justify-center relative overflow-hidden"
            >
              <div className="absolute inset-0 opacity-5 bg-[url('data:image/svg+xml,%3Csvg width=\'20\' height=\'20\' viewBox=\'0 0 20 20\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Ccircle cx=\'2\' cy=\'2\' r=\'2\' fill=\'%231c1c1c\'/%3E%3C/svg%3E')]"></div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 relative z-10 w-full">
                <div className="bg-[var(--color-accent)]/10 p-4 md:p-6 flex flex-col items-center justify-center gap-2 md:gap-3 text-[var(--color-accent)]">
                  <Brain className="w-8 h-8 md:w-10 md:h-10" />
                  <span className="font-serif font-bold text-sm md:text-base">EEG</span>
                </div>
                <div className="bg-[var(--color-enji)]/10 p-4 md:p-6 flex flex-col items-center justify-center gap-2 md:gap-3 text-[var(--color-enji)]">
                  <Heart className="w-8 h-8 md:w-10 md:h-10" />
                  <span className="font-serif font-bold text-sm md:text-base">ECG</span>
                </div>
                <div className="bg-[var(--color-matsu)]/10 p-4 md:p-6 flex flex-col items-center justify-center gap-2 md:gap-3 text-[var(--color-matsu)]">
                  <Activity className="w-8 h-8 md:w-10 md:h-10" />
                  <span className="font-serif font-bold text-sm md:text-base">EMG</span>
                </div>
                <div className="bg-[var(--color-kin)]/10 p-4 md:p-6 flex flex-col items-center justify-center gap-2 md:gap-3 text-[var(--color-kin)]">
                  <Zap className="w-8 h-8 md:w-10 md:h-10" />
                  <span className="font-serif font-bold text-sm md:text-base">EDA</span>
                </div>
                <div className="bg-[var(--color-nibiiro)]/10 p-4 md:p-6 flex flex-col items-center justify-center gap-2 md:gap-3 text-[var(--color-nibiiro)]">
                  <Network className="w-8 h-8 md:w-10 md:h-10" />
                  <span className="font-serif font-bold text-sm md:text-base">MoCap</span>
                </div>
                <div className="bg-[var(--color-sumi)]/5 p-4 md:p-6 flex flex-col items-center justify-center gap-2 md:gap-3 text-[var(--color-sumi)]">
                  <GitMerge className="w-8 h-8 md:w-10 md:h-10" />
                  <span className="font-serif font-bold text-sm md:text-base">Cross</span>
                </div>
              </div>
            </motion.div>

            {/* Language and workflow status below the illustration */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.4 }}
              className="max-w-lg mx-auto mt-6 flex flex-wrap justify-center items-center gap-3 md:gap-4"
            >
              <div className="flex items-center gap-2.5 px-4 py-2 bg-white rounded-lg shadow-sm border border-[var(--color-sumi)]/10">
                <img src="https://cdn.simpleicons.org/r/276DC3" alt="R logo" className="w-5 h-5" referrerPolicy="no-referrer" />
                <span className="font-bold text-[#276DC3]">R</span>
                <span className="w-2 h-2 rounded-full bg-green-500 ml-1" title="Released"></span>
              </div>
              <div className="flex items-center gap-2.5 px-4 py-2 bg-white rounded-lg shadow-sm border border-[var(--color-sumi)]/10">
                <img src="https://cdn.simpleicons.org/python/3776AB" alt="Python logo" className="w-5 h-5" referrerPolicy="no-referrer" />
                <span className="font-bold text-[#3776AB]">Python</span>
                <span className="w-2 h-2 rounded-full bg-green-500 ml-1" title="Available — physiopy docs live; PyPI pending"></span>
              </div>
              <div className="flex items-center gap-2.5 px-4 py-2 bg-white rounded-lg shadow-sm border border-[var(--color-sumi)]/10">
                <img src="https://cdn.simpleicons.org/nextflow/1EABA6" alt="Nextflow logo" className="w-5 h-5" referrerPolicy="no-referrer" />
                <span className="font-bold text-[#1EABA6]">Nextflow</span>
                <span className="w-2 h-2 rounded-full bg-green-500 ml-1" title="Released via PhysioPipe"></span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Start Section */}
      <section id="start" className="pt-10 pb-16 md:py-20 bg-white border-y border-[var(--color-sumi)]/10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-[0.8fr_2.2fr] gap-10 lg:gap-16 items-start">
            <div>
              <h2 className="text-2xl md:text-3xl font-serif font-bold text-[var(--color-sumi)] mb-4">
                {currentT.start.title}
              </h2>
              <p className="text-[var(--color-nibiiro)] leading-relaxed">
                {currentT.start.subtitle}
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 border-t border-l border-[var(--color-sumi)]/10">
              {currentT.start.steps.map((step, index) => {
                const href = ['#getting-started', '#workflow', 'https://github.com/x-biosignal/PhysioExperiment#quick-start'][index];
                const isExternal = index === 2;
                return (
                  <div key={step.title} className="min-h-56 p-6 border-r border-b border-[var(--color-sumi)]/10 flex flex-col">
                    <h3 className="text-base font-serif font-bold mb-3">{step.title}</h3>
                    <p className="text-sm text-[var(--color-sumi)]/70 leading-relaxed mb-6">{step.desc}</p>
                    <a
                      href={href}
                      target={isExternal ? '_blank' : undefined}
                      rel={isExternal ? 'noreferrer' : undefined}
                      className="mt-auto inline-flex items-center gap-2 text-sm font-medium text-[var(--color-accent)] hover:text-[var(--color-accent)]/70 transition-colors"
                    >
                      {step.action}
                      {isExternal ? <ExternalLink className="w-3.5 h-3.5" /> : <ArrowRight className="w-3.5 h-3.5" />}
                    </a>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Concept / Workflow Section */}
      <section id="workflow" className="py-20 md:py-24 bg-white/50 border-y border-[var(--color-sumi)]/10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-2xl md:text-3xl font-serif font-bold text-[var(--color-sumi)] mb-4 flex items-center justify-center gap-4">
              <span className="w-8 md:w-12 h-[1px] bg-[var(--color-kin)]"></span>
              {currentT.workflow.title}
              <span className="w-8 md:w-12 h-[1px] bg-[var(--color-kin)]"></span>
            </h2>
            <p className="text-[var(--color-nibiiro)]">{currentT.workflow.subtitle}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-8 relative">
            {/* Connecting line for desktop */}
            <div className="hidden md:block absolute top-1/2 left-0 w-full h-[1px] bg-[var(--color-sumi)]/20 -translate-y-1/2 z-0"></div>

            {[
              { step: '01', title: currentT.workflow.steps[0].title, desc: currentT.workflow.steps[0].desc, icon: Download, color: 'text-[var(--color-nibiiro)]' },
              { step: '02', title: currentT.workflow.steps[1].title, desc: currentT.workflow.steps[1].desc, icon: Settings, color: 'text-[var(--color-matsu)]' },
              { step: '03', title: currentT.workflow.steps[2].title, desc: currentT.workflow.steps[2].desc, icon: Activity, color: 'text-[var(--color-accent)]' },
              { step: '04', title: currentT.workflow.steps[3].title, desc: currentT.workflow.steps[3].desc, icon: GitMerge, color: 'text-[var(--color-enji)]' },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="relative z-10 bg-[var(--color-washi)] p-6 md:p-8 wafu-border flex flex-col items-center text-center"
              >
                <div className="text-3xl md:text-4xl font-serif font-bold text-[var(--color-sumi)]/10 absolute top-4 right-4">{item.step}</div>
                <div className={`w-14 h-14 md:w-16 md:h-16 rounded-full bg-white flex items-center justify-center mb-4 md:mb-6 shadow-sm border border-[var(--color-sumi)]/10 ${item.color}`}>
                  <item.icon className="w-6 h-6 md:w-8 md:h-8" />
                </div>
                <h3 className="text-lg md:text-xl font-serif font-bold mb-2 md:mb-3">{item.title}</h3>
                <p className="text-sm text-[var(--color-sumi)]/80 leading-relaxed">{item.desc}</p>
                <div className="mt-5 pt-4 border-t border-[var(--color-sumi)]/10 w-full flex flex-wrap justify-center gap-2">
                  {WORKFLOW_PACKAGES[i].map(name => (
                    <a
                      key={name}
                      href={`https://github.com/x-biosignal/${name}`}
                      target="_blank"
                      rel="noreferrer"
                      className="text-xs text-[var(--color-accent)] hover:underline"
                    >
                      {name}
                    </a>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Packages Section */}
      <section id="packages" className="py-20 md:py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-6">
            <div>
              <h2 className="text-2xl md:text-3xl font-serif font-bold text-[var(--color-sumi)] mb-3 md:mb-4 flex items-center gap-4">
                <span className="w-8 h-[1px] bg-[var(--color-kin)]"></span>
                {currentT.packages.title}
              </h2>
              <p className="text-[var(--color-nibiiro)]">{currentT.packages.subtitle}</p>
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategoryId(cat.id)}
                  className={`px-3 md:px-4 py-1.5 md:py-2 text-xs md:text-sm font-medium transition-colors border ${
                    activeCategoryId === cat.id
                      ? 'bg-[var(--color-sumi)] text-white border-[var(--color-sumi)]'
                      : 'bg-transparent text-[var(--color-sumi)] border-[var(--color-sumi)]/20 hover:border-[var(--color-sumi)]/50'
                  }`}
                >
                  {cat[lang]}
                </button>
              ))}
            </div>
          </div>

          {/* Search Bar */}
          <div className="mb-10">
            <div className="relative max-w-2xl">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--color-sumi)]/40" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={currentT.packages.searchPlaceholder}
                className="w-full pl-12 pr-12 py-4 bg-white border border-[var(--color-sumi)]/10 rounded-sm focus:outline-none focus:border-[var(--color-accent)]/50 transition-colors text-[var(--color-sumi)] shadow-sm"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[var(--color-sumi)]/40 hover:text-[var(--color-sumi)] transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {filteredPackages.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {filteredPackages.map((pkg) => {
                const categoryName = CATEGORIES.find(c => c.id === pkg.categoryId)?.[lang] || '';
                return (
                  <motion.div
                    key={pkg.name}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                    className="group bg-white border border-[var(--color-sumi)]/10 p-5 md:p-6 hover:shadow-md transition-all hover:border-[var(--color-accent)]/30 flex flex-col h-full"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-10 h-10 md:w-12 md:h-12 bg-[var(--color-washi)] flex items-center justify-center text-[var(--color-accent)] group-hover:bg-[var(--color-accent)] group-hover:text-white transition-colors">
                        <pkg.icon className="w-5 h-5 md:w-6 md:h-6" />
                      </div>
                      <span className="text-xs font-medium px-2 py-1 bg-[var(--color-washi)] text-[var(--color-nibiiro)]">
                        {categoryName}
                      </span>
                    </div>
                    <h3 className="text-lg md:text-xl font-serif font-bold mb-2 group-hover:text-[var(--color-accent)] transition-colors">
                      {pkg.name}
                    </h3>
                    <p className="text-sm text-[var(--color-sumi)]/80 mb-6 flex-grow leading-relaxed">
                      {pkg.desc[lang]}
                    </p>
                    <div className="mt-auto pt-4 border-t border-[var(--color-sumi)]/5 flex flex-col gap-3">
                      <div className="flex items-center justify-between">
                        <a
                          href={pkg.url}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1 text-sm font-medium text-[var(--color-accent)] hover:text-[var(--color-accent)]/70 transition-colors"
                        >
                          {currentT.packages.githubLink}
                          <ExternalLink className="w-3 h-3" />
                        </a>
                        <a
                          href={pkg.docsUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1 text-sm font-medium text-[var(--color-sumi)]/60 hover:text-[var(--color-sumi)] transition-colors"
                        >
                          <BookOpen className="w-3 h-3" />
                          {currentT.packages.docsLink}
                        </a>
                      </div>
                      <div className="flex items-center gap-1.5">
                        {pkg.lang === 'Python' ? (
                          <span className="px-2 py-0.5 text-[10px] font-bold bg-[#3776AB]/10 text-[#3776AB] border border-[#3776AB]/20 rounded-sm" title="Available in Python">
                            Python
                          </span>
                        ) : (
                          <span className="px-2 py-0.5 text-[10px] font-bold bg-[#276DC3]/10 text-[#276DC3] border border-[#276DC3]/20 rounded-sm" title="Available in R">
                            R
                          </span>
                        )}
                        <span className="px-2 py-0.5 text-[10px] font-bold bg-[var(--color-matsu)]/10 text-[var(--color-matsu)] border border-[var(--color-matsu)]/20 rounded-sm">
                          MIT
                        </span>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          ) : (
            <div className="py-20 text-center border border-dashed border-[var(--color-sumi)]/20 rounded-sm">
              <p className="text-[var(--color-nibiiro)]">{currentT.packages.noResults}</p>
              <button
                onClick={() => {setSearchQuery(''); setActiveCategoryId('all');}}
                className="mt-4 text-sm font-medium text-[var(--color-accent)] hover:underline"
              >
                {lang === 'ja' ? 'すべてのフィルターをリセット' : 'Reset all filters'}
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Documentation Section */}
      <section id="docs" className="py-20 md:py-24 bg-[var(--color-washi)] border-t border-[var(--color-sumi)]/10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-2xl md:text-3xl font-serif font-bold text-[var(--color-sumi)] mb-4 flex items-center justify-center gap-4">
              <span className="w-8 md:w-12 h-[1px] bg-[var(--color-kin)]"></span>
              {currentT.docs.title}
              <span className="w-8 md:w-12 h-[1px] bg-[var(--color-kin)]"></span>
            </h2>
            <p className="text-[var(--color-nibiiro)] max-w-2xl mx-auto">
              {currentT.docs.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 border-t border-l border-[var(--color-sumi)]/10">
            {currentT.docs.links.map((entry, index) => {
              const Icon = DOC_ICONS[index];
              return (
                <a
                  key={entry.title}
                  href={DOC_URLS[index]}
                  target="_blank"
                  rel="noreferrer"
                  className="group min-h-40 p-6 md:p-8 bg-white border-r border-b border-[var(--color-sumi)]/10 hover:bg-[var(--color-sumi)]/[0.02] transition-colors flex gap-5"
                >
                  <div className="w-11 h-11 shrink-0 bg-[var(--color-sumi)]/5 flex items-center justify-center text-[var(--color-accent)]">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-base font-bold font-serif text-[var(--color-sumi)] mb-2 flex items-center gap-2">
                      {entry.title}
                      <ExternalLink className="w-3.5 h-3.5 text-[var(--color-nibiiro)] group-hover:text-[var(--color-accent)]" />
                    </h3>
                    <p className="text-sm text-[var(--color-sumi)]/70 leading-relaxed mb-3">{entry.desc}</p>
                    <span className="text-xs font-medium text-[var(--color-accent)]">{currentT.docs.open}</span>
                  </div>
                </a>
              );
            })}
          </div>
        </div>
      </section>

      {/* MCP Section */}
      <section id="mcp" className="py-20 md:py-24 bg-white border-t border-[var(--color-sumi)]/10">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-[0.9fr_1.6fr] gap-12 lg:gap-20 items-start">
          <div>
            <div className="w-12 h-12 bg-[var(--color-accent)] text-white flex items-center justify-center mb-6">
              <Search className="w-6 h-6" />
            </div>
            <h2 className="text-2xl md:text-3xl font-serif font-bold text-[var(--color-sumi)] mb-4">
              {currentT.mcp.title}
            </h2>
            <p className="text-[var(--color-nibiiro)] leading-relaxed mb-8">
              {currentT.mcp.subtitle}
            </p>
            <div className="flex flex-wrap gap-5 text-sm font-medium">
              <a
                href="https://github.com/x-biosignal/mcp-server-biosignal"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-[var(--color-accent)] hover:underline"
              >
                <Github className="w-4 h-4" />
                {currentT.mcp.source}
              </a>
              <a
                href="/llms.txt"
                className="inline-flex items-center gap-2 text-[var(--color-sumi)]/70 hover:text-[var(--color-sumi)]"
              >
                <FileText className="w-4 h-4" />
                {currentT.mcp.machine}
              </a>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 border-t border-l border-[var(--color-sumi)]/10">
            {currentT.mcp.features.map((feature, index) => {
              const icons = [Database, Search, GitMerge];
              const Icon = icons[index];
              return (
                <div key={feature.title} className="min-h-52 p-6 border-r border-b border-[var(--color-sumi)]/10">
                  <Icon className="w-6 h-6 text-[var(--color-accent)] mb-8" />
                  <h3 className="font-serif font-bold text-base mb-3">{feature.title}</h3>
                  <p className="text-sm text-[var(--color-sumi)]/70 leading-relaxed">{feature.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Getting Started Section */}
      <section id="getting-started" className="py-20 md:py-24 bg-[var(--color-sumi)] text-white">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-10 md:mb-12">
            <h2 className="text-2xl md:text-3xl font-serif font-bold mb-3 md:mb-4 flex items-center justify-center gap-4">
              <span className="w-8 md:w-12 h-[1px] bg-[var(--color-kin)]"></span>
              {currentT.install.title}
              <span className="w-8 md:w-12 h-[1px] bg-[var(--color-kin)]"></span>
            </h2>
            <p className="text-white/70">
              {installTab === 'R' ? currentT.install.subtitle :
               installTab === 'Python' ? currentT.install.pythonSubtitle :
               currentT.install.nextflowSubtitle}
            </p>
          </div>

          <div className="flex justify-center mb-6">
            <div className="inline-flex bg-white/5 p-1 rounded-sm border border-white/10 flex-wrap justify-center">
              {(['R', 'Python', 'Nextflow'] as const).map(tab => (
                <button
                  key={tab}
                  onClick={() => setInstallTab(tab)}
                  className={`px-6 py-2 text-sm font-medium rounded-sm transition-colors flex items-center gap-2 ${
                    installTab === tab
                      ? 'bg-[var(--color-accent)] text-white shadow-sm'
                      : 'text-white/60 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {tab}
                  {tab !== 'R' && (
                    <span className="px-1.5 py-0.5 text-[9px] bg-white/20 rounded-sm">
                      Dev
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-[#111] p-4 md:p-6 rounded-sm border border-white/10 font-mono text-xs md:text-sm overflow-x-auto relative">
            <div className="absolute top-0 left-0 w-full h-1 bg-[var(--color-accent)]"></div>
            <pre className="text-gray-300 leading-relaxed">
              {installTab === 'R' ? (
                <code className="language-r">
<span className="text-gray-500">{currentT.install.comment1}</span>{'\n'}
options(repos = c({'\n'}
{'  '}xbiosignal = <span className="text-green-400">'https://x-biosignal.r-universe.dev'</span>,{'\n'}
{'  '}CRAN = <span className="text-green-400">'https://cloud.r-project.org'</span>{'\n'}
)){'\n'}
{'\n'}
<span className="text-gray-500">{currentT.install.comment2}</span>{'\n'}
install.packages(<span className="text-green-400">'PhysioExperiment'</span>){'\n'}
                </code>
              ) : installTab === 'Python' ? (
                <code className="language-python">
<span className="text-gray-500">{currentT.install.pythonComment1}</span>{'\n'}
<span className="text-gray-500">{currentT.install.pythonComment2}</span>{'\n'}
<span>pip install git+https://github.com/x-biosignal/physiopy</span>{'\n'}
                </code>
              ) : (
                <code className="language-bash">
<span className="text-gray-500">{currentT.install.nextflowComment1}</span>{'\n'}
<span className="text-gray-500">{currentT.install.nextflowComment2}</span>{'\n'}
<span>nextflow run ecg_hrv.nf --records 'data/*.hea'</span>{'\n'}
                </code>
              )}
            </pre>
          </div>

          <div className="mt-8 text-center">
            <a
              href="https://x-biosignal.r-universe.dev"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 text-[var(--color-kin)] hover:text-white transition-colors text-sm md:text-base"
            >
              <BookOpen className="w-4 h-4" />
              {currentT.install.runiverseLink}
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[var(--color-washi)] py-8 md:py-12 border-t border-[var(--color-sumi)]/10 mt-auto">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4 md:gap-6">
          <div className="flex items-center gap-2">
            <Activity className="w-5 h-5 text-[var(--color-accent)]" />
            <span className="font-serif font-bold text-lg">x-biosignal</span>
          </div>
          <p className="text-xs md:text-sm text-[var(--color-nibiiro)]">
            &copy; {new Date().getFullYear()} Yusuke Matsui. MIT licensed.
          </p>
          <div className="flex gap-4">
            <a href="https://github.com/x-biosignal" target="_blank" rel="noreferrer" className="text-[var(--color-nibiiro)] hover:text-[var(--color-sumi)] transition-colors">
              <Github className="w-5 h-5" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
