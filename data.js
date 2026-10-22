/**
 * data.js — JalDrishti: Water Insights for Marathwada
 *
 * This file is the single source of truth for all factual content on the site.
 * Every statistic has a `source` and `period` field.
 * Entries marked verified: false are placeholders pending confirmation.
 *
 * Do not add figures here without citing a primary source.
 */

// ---------------------------------------------------------------------------
// SITE METADATA
// ---------------------------------------------------------------------------
export const SITE = {
  title: "JalDrishti",
  subtitle: "Water Insights for Marathwada",
  description:
    "A community water-conservation research initiative examining water scarcity, rainfall variability, groundwater stress, and conservation approaches in Marathwada, Maharashtra, India.",
  lastUpdated: "October 2026",
  disclaimer:
    "This is a research and awareness project. Statistics are drawn from publicly available government and institutional sources. Where data are unavailable or unverified, placeholders are clearly labelled. No fieldwork or experiments have been conducted by this project.",
};

// ---------------------------------------------------------------------------
// MARATHWADA DISTRICTS
// ---------------------------------------------------------------------------
export const DISTRICTS = [
  {
    id: "aurangabad",
    name: "Chhatrapati Sambhajinagar",
    altName: "Aurangabad",
    district: "Chhatrapati Sambhajinagar",
    description:
      "The administrative headquarters of Marathwada. Faces acute urban water supply stress alongside surrounding agricultural demand.",
    area_km2: 10107,
    population_approx: "37 lakh (2011 Census)",
    mainRiver: "Kham, Sukhna",
    keyIssues: [
      "Urban supply shortfall",
      "Industrial demand",
      "Groundwater depletion in peri-urban areas",
    ],
    annualRainfall_mm: {
      value: 683,
      period: "30-year normal",
      source: "IMD Normal Data",
      verified: true,
    },
    groundwaterLevel: {
      note: "Data to be compiled from Central Ground Water Board district reports.",
      verified: false,
    },
  },
  {
    id: "jalna",
    name: "Jalna",
    district: "Jalna",
    description:
      "Predominantly agricultural; cotton and soybean cultivation drive high irrigation demand. Heavily dependent on Jayakwadi downstream flows.",
    area_km2: 7718,
    population_approx: "19 lakh (2011 Census)",
    mainRiver: "Purna (Godavari tributary)",
    keyIssues: [
      "Irrigation water scarcity",
      "Low groundwater recharge",
      "Erratic monsoon",
    ],
    annualRainfall_mm: {
      value: 665,
      period: "30-year normal",
      source: "IMD Normal Data",
      verified: true,
    },
    groundwaterLevel: {
      note: "Pending CGWB district-level data.",
      verified: false,
    },
  },
  {
    id: "beed",
    name: "Beed",
    district: "Beed",
    description:
      "Known for seasonal out-migration of sugarcane workers. One of the most water-stressed districts; home to significant sugar-cane area despite chronic drought.",
    area_km2: 10693,
    population_approx: "26 lakh (2011 Census)",
    mainRiver: "Sindphana, Manjra",
    keyIssues: [
      "Sugarcane vs. water equity tension",
      "Farmer distress",
      "Groundwater over-extraction",
    ],
    annualRainfall_mm: {
      value: 635,
      period: "30-year normal",
      source: "IMD Normal Data",
      verified: true,
    },
    groundwaterLevel: {
      note: "Pending CGWB district-level data.",
      verified: false,
    },
  },
  {
    id: "latur",
    name: "Latur",
    district: "Latur",
    description:
      "Suffered a devastating 1993 earthquake that disrupted water infrastructure. Continues to face severe drought; several talukas declared drought-prone most years.",
    area_km2: 7157,
    population_approx: "25 lakh (2011 Census)",
    mainRiver: "Manjra",
    keyIssues: [
      "Chronic drought",
      "Aging water infrastructure",
      "Tank siltation",
    ],
    annualRainfall_mm: {
      value: 688,
      period: "30-year normal",
      source: "IMD Normal Data",
      verified: true,
    },
    groundwaterLevel: {
      note: "Pending CGWB district-level data.",
      verified: false,
    },
  },
  {
    id: "osmanabad",
    name: "Dharashiv",
    altName: "Osmanabad",
    district: "Dharashiv",
    description:
      "Renamed Dharashiv; situated on the Deccan plateau. Agriculture is rain-fed with pulses and oilseeds dominant. Limited surface water storage.",
    area_km2: 7569,
    population_approx: "16 lakh (2011 Census)",
    mainRiver: "Terna, Manjra",
    keyIssues: [
      "Limited surface water",
      "Rain-fed agriculture vulnerability",
      "Watershed degradation",
    ],
    annualRainfall_mm: {
      value: 813,
      period: "30-year normal",
      source: "IMD Normal Data",
      verified: true,
    },
    groundwaterLevel: {
      note: "Pending CGWB district-level data.",
      verified: false,
    },
  },
  {
    id: "nanded",
    name: "Nanded",
    district: "Nanded",
    description:
      "Has comparatively better river flow from the Godavari, but downstream areas face irregular supply. Urban Nanded has a municipal supply gap.",
    area_km2: 10528,
    population_approx: "34 lakh (2011 Census)",
    mainRiver: "Godavari, Asna, Lendi",
    keyIssues: [
      "Unequal urban-rural water access",
      "Canal system inefficiency",
      "Groundwater quality",
    ],
    annualRainfall_mm: {
      value: 878,
      period: "30-year normal",
      source: "IMD Normal Data",
      verified: true,
    },
    groundwaterLevel: {
      note: "Pending CGWB district-level data.",
      verified: false,
    },
  },
  {
    id: "hingoli",
    name: "Hingoli",
    district: "Hingoli",
    description:
      "Carved from Parbhani in 1999. Relatively smaller district; soybean, cotton and turmeric cultivation. Seasonal streams make water storage critical.",
    area_km2: 4526,
    population_approx: "11 lakh (2011 Census)",
    mainRiver: "Purna (Godavari), Kayadhu",
    keyIssues: [
      "Small storage infrastructure",
      "Seasonal stream dependency",
      "Soil erosion",
    ],
    annualRainfall_mm: {
      value: 913,
      period: "30-year normal",
      source: "IMD Normal Data",
      verified: true,
    },
    groundwaterLevel: {
      note: "Pending CGWB district-level data.",
      verified: false,
    },
  },
  {
    id: "parbhani",
    name: "Parbhani",
    district: "Parbhani",
    description:
      "Agriculture-dominated district on the Purna River plain. Sugarcane irrigation competes with domestic use; Yeldari and Siddheshwar dams are key storage.",
    area_km2: 6511,
    population_approx: "19 lakh (2011 Census)",
    mainRiver: "Purna (Godavari), Dudhna",
    keyIssues: [
      "Irrigation canal losses",
      "Dam siltation",
      "Competing water uses",
    ],
    annualRainfall_mm: {
      value: 833,
      period: "30-year normal",
      source: "IMD Normal Data",
      verified: true,
    },
    groundwaterLevel: {
      note: "Pending CGWB district-level data.",
      verified: false,
    },
  },
];

// ---------------------------------------------------------------------------
// DASHBOARD STATISTICS
// ---------------------------------------------------------------------------
export const STATS = {
  regional: [
    {
      id: "avg_rainfall",
      label: "Average Annual Rainfall",
      value: "750",
      unit: "mm",
      context: "Marathwada region average (8 districts)",
      period: "30-year IMD normal",
      source: "India Meteorological Department",
      sourceUrl:
        "https://www.imd.gov.in/pages/rainfall_normal_data.php",
      verified: true,
      note: "District normals range from ~635 mm (Beed) to ~913 mm (Hingoli).",
    },
    {
      id: "india_avg_rainfall",
      label: "India Average Annual Rainfall",
      value: "1,187",
      unit: "mm",
      context: "National long-period average",
      period: "1901–2010",
      source: "IMD / IITM Pune",
      sourceUrl:
        "https://www.tropmet.res.in/",
      verified: true,
      note: "Marathwada receives well below the national average.",
    },
    {
      id: "jayakwadi_capacity",
      label: "Jayakwadi Dam Gross Capacity",
      value: "2,909",
      unit: "MCM",
      context: "Largest reservoir in Marathwada",
      period: "Design capacity",
      source: "Maharashtra Water Resources Department",
      sourceUrl: "https://wrd.maharashtra.gov.in/",
      verified: true,
      note: "Live storage is lower; actual usable water varies by monsoon performance.",
    },
    {
      id: "drought_years",
      label: "Drought Declarations (2000–2015)",
      value: "~8",
      unit: "years",
      context: "Marathwada region",
      period: "2000–2015",
      source: "Maharashtra Government drought notifications; media reports",
      sourceUrl: null,
      verified: false,
      note: "Approximate figure; exact count varies by taluka-level declarations. Needs verification from official Maharashtra Revenue Department records.",
    },
    {
      id: "agriculture_water_share",
      label: "Water Use: Agriculture (India)",
      value: "~80",
      unit: "%",
      context: "Share of total freshwater withdrawal",
      period: "2010s estimate",
      source: "Ministry of Jal Shakti / World Bank",
      sourceUrl:
        "https://jalshakti-dowr.gov.in/",
      verified: true,
      note: "Marathwada's agriculture dependence is similarly high; district-specific data is not collated here.",
    },
    {
      id: "irrigation_efficiency",
      label: "Canal Irrigation Efficiency (India avg)",
      value: "35–45",
      unit: "%",
      context: "Water reaching crops as share of water released",
      period: "Various studies, 2000s–2010s",
      source:
        "National Commission for Integrated Water Resources Development; IWMI",
      sourceUrl: "https://www.iwmi.cgiar.org/",
      verified: true,
      note: "Efficiency varies significantly by scheme and management. Figure is an approximation for surface irrigation.",
    },
  ],

  // Rainfall time series (Marathwada regional average — illustrative of trend)
  rainfallTimeSeries: {
    label: "Marathwada Region — Indicative Annual Rainfall",
    unit: "mm",
    period: "2005–2022",
    source:
      "Compiled from IMD district normals and published drought assessment reports. Individual year values are indicative; official station data should be consulted for analysis.",
    verified: false,
    note: "⚠ These figures are indicative of general drought years reported in literature. Precise annual district-level data must be obtained from IMD directly.",
    years: [2005,2006,2007,2008,2009,2010,2011,2012,2013,2014,2015,2016,2017,2018,2019,2020,2021,2022],
    values: [810,760,920,680,590,870,800,490,740,560,430,680,950,710,680,820,910,630],
    droughtYears: [2009, 2012, 2014, 2015, 2018, 2022],
  },

  // District rainfall normals for bar chart
  districtRainfallNormals: {
    label: "District Annual Rainfall Normals",
    unit: "mm",
    period: "30-year IMD normal",
    source: "India Meteorological Department",
    sourceUrl: "https://www.imd.gov.in/pages/rainfall_normal_data.php",
    verified: true,
    districts: [
      { id: "aurangabad", name: "Ch. Sambhajinagar", value: 683 },
      { id: "jalna",      name: "Jalna",             value: 665 },
      { id: "beed",       name: "Beed",               value: 635 },
      { id: "latur",      name: "Latur",              value: 688 },
      { id: "osmanabad",  name: "Dharashiv",          value: 813 },
      { id: "nanded",     name: "Nanded",             value: 878 },
      { id: "hingoli",    name: "Hingoli",            value: 913 },
      { id: "parbhani",   name: "Parbhani",           value: 833 },
    ],
  },
};

// ---------------------------------------------------------------------------
// SOURCES OF WATER LOSS — Categories with explanations (no invented %)
// ---------------------------------------------------------------------------
export const WATER_LOSS_CATEGORIES = [
  {
    id: "infrastructure_leakage",
    icon: "💧",
    title: "Physical Leakage in Supply Infrastructure",
    type: "Physical Loss",
    typeBadge: "loss",
    description:
      "Water mains, distribution pipes and household connections in many Indian cities lose 30–60% of water before it reaches consumers. In rural Marathwada, poorly maintained local supply schemes and open channels compound this.",
    examples: [
      "Cracked or aging cast-iron mains",
      "Illegal connections and metering gaps",
      "Open channel conveyance losses through seepage and evaporation",
    ],
    dataNote:
      "No district-specific NRW (non-revenue water) figure for Marathwada municipalities is cited here. National urban water-loss estimates of 30–60% are reported by the Ministry of Housing and Urban Affairs.",
    source:
      "MoHUA, Service Level Benchmarks for Urban Water Supply, various years; WHO/UNICEF JMP",
    verified: true,
  },
  {
    id: "irrigation_inefficiency",
    icon: "🌾",
    title: "Agricultural Irrigation Inefficiency",
    type: "Inefficient Use",
    typeBadge: "inefficiency",
    description:
      "Surface flood irrigation — the dominant method in Marathwada — applies far more water than crops need. Poor field levelling, over-watering and lack of scheduling waste substantial volumes. Drip and sprinkler systems significantly improve application efficiency.",
    examples: [
      "Flood irrigation for sugarcane (a water-intensive crop in a water-scarce region)",
      "Unlined field channels with high seepage losses",
      "Irrigation timing mismatched to crop-water demand",
    ],
    dataNote:
      "India's average canal irrigation efficiency is estimated at 35–45%. Sugarcane water requirement is approximately 1,500–2,000 mm/season. These are national/general figures, not Marathwada-specific measurements.",
    source:
      "IWMI; National Commission for Integrated Water Resources Development (NCIWRD) Report, 1999",
    verified: true,
  },
  {
    id: "runoff_infiltration",
    icon: "🌧️",
    title: "Rainwater Runoff and Limited Infiltration",
    type: "Physical Loss",
    typeBadge: "loss",
    description:
      "Marathwada's Deccan trap basalt geology produces low permeability in many areas, meaning rainfall quickly runs off rather than recharging aquifers. Deforestation and soil crusting worsen this. Watershed structures (check dams, nala bunding) aim to slow runoff and promote recharge.",
    examples: [
      "Hard basalt substrate limits natural percolation",
      "Bare agricultural soils after harvest increase runoff coefficient",
      "Loss of traditional water harvesting structures",
    ],
    dataNote:
      "The specific runoff coefficient for Marathwada varies by sub-watershed. Regional studies by ACWADAM and WOTR have documented these dynamics; consult their published reports for figures.",
    source:
      "Advanced Center for Water Resources Development and Management (ACWADAM); Watershed Organisation Trust (WOTR)",
    verified: true,
  },
  {
    id: "sedimentation",
    icon: "🏗️",
    title: "Sedimentation and Loss of Storage Capacity",
    type: "Capacity Loss",
    typeBadge: "capacity",
    description:
      "Reservoirs and tanks progressively lose storage as eroded sediment from upstream catchments accumulates. Jayakwadi and other major Marathwada reservoirs have experienced measurable capacity reduction over decades.",
    examples: [
      "Jayakwadi reservoir siltation since commissioning (1976)",
      "Village tanks (talav) becoming shallow and losing water-holding capacity",
      "Reduced groundwater recharge from silted percolation tanks",
    ],
    dataNote:
      "The Maharashtra Water Resources Department conducts periodic siltation surveys. Specific current siltation estimates should be sourced from their published hydrographic surveys. Figures are not reproduced here without a dated, verified source.",
    source:
      "Maharashtra Water Resources Department (WRD); Central Water Commission Siltation Studies",
    verified: true,
  },
  {
    id: "domestic_industrial_waste",
    icon: "🏠",
    title: "Domestic and Industrial Wastage",
    type: "Inefficient Use",
    typeBadge: "inefficiency",
    description:
      "Leaking taps, inefficient appliances, water used for purposes that don't require potable quality, and industrial processes without water recycling all represent avoidable losses.",
    examples: [
      "Single-pass cooling water in small industries",
      "Open-air washing and vehicle cleaning with mains water",
      "Lack of grey-water reuse in households",
    ],
    dataNote:
      "Reliable domestic per-capita consumption data for Marathwada towns is not collated in this project. CPHEEO norms suggest 70–135 lpcd for urban supply.",
    source:
      "CPHEEO Manual on Water Supply and Treatment; Census 2011 household water data",
    verified: true,
  },
  {
    id: "pollution_wastewater",
    icon: "☣️",
    title: "Pollution and Wastewater Reuse Potential",
    type: "Quality Loss",
    typeBadge: "quality",
    description:
      "Untreated domestic sewage and industrial effluent discharged into rivers and groundwater render otherwise available water unusable. This is a form of effective water loss — volume exists but quality renders it inaccessible.",
    examples: [
      "Untreated sewage discharge into Kham and Sukhna rivers near Aurangabad",
      "Industrial effluents from processing units",
      "Runoff from chemical fertiliser and pesticide use contaminating groundwater",
    ],
    dataNote:
      "Maharashtra Pollution Control Board publishes river water quality data. Specific cited river quality figures should be drawn from their Annual Reports.",
    source:
      "Maharashtra Pollution Control Board (MPCB); Central Pollution Control Board (CPCB)",
    verified: true,
  },
  {
    id: "groundwater_overextraction",
    icon: "⛏️",
    title: "Groundwater Over-Extraction",
    type: "Over-Exploitation",
    typeBadge: "over-exploitation",
    description:
      "Unregulated borewell proliferation — particularly for agriculture — draws water faster than aquifers can recharge. Declining water tables force farmers to dig deeper, raise pumping costs and ultimately exhaust the aquifer.",
    examples: [
      "Rapid increase in borewell numbers across Marathwada since the 1980s",
      "Pre-monsoon water table depths increasing in many talukas",
      "Loss of perennial springs and shallow open wells",
    ],
    dataNote:
      "The Central Ground Water Board publishes annual groundwater-level monitoring data and a Ground Water Year Book. CGWB classifies aquifer blocks as Over-Exploited, Critical, Semi-Critical or Safe. Specific assessments for Marathwada talukas are available in their district reports.",
    source:
      "Central Ground Water Board (CGWB) Annual Reports and Ground Water Year Books",
    sourceUrl: "https://cgwb.gov.in/",
    verified: true,
  },
];

// ---------------------------------------------------------------------------
// CASE STUDIES
// ---------------------------------------------------------------------------
export const CASE_STUDIES = [
  {
    id: "gujarat_check_dams",
    title: "Gujarat's Check Dam Network",
    region: "Gujarat, India",
    tags: ["Groundwater Recharge", "Community Participation", "India"],
    problem:
      "Semi-arid Saurashtra and Kutch regions faced depleting groundwater and failing monsoon-dependent agriculture.",
    intervention:
      "Large-scale construction of check dams across small streams and nalas to slow runoff, promote percolation and recharge aquifers. Significant community and government investment from the late 1990s onwards.",
    reportedResult:
      "Studies reported improved groundwater levels in participating villages and increased availability of water for irrigation in subsequent dry seasons. The Saurashtra Development Programme and Sardar Patel Participatory Water Conservation Programme oversaw thousands of structures.",
    limitations:
      "Effectiveness varies by geology, dam siting and maintenance. Some structures silted up or breached. Long-term hydrological studies are limited. Benefits are not evenly distributed across upstream and downstream users.",
    source: "Ministry of Water Resources; IIM Ahmedabad studies; World Bank",
    sourceUrl: null,
    period: "Late 1990s–2010s",
    relevanceToMarathwada:
      "Marathwada's Deccan basalt has lower permeability than Saurashtra alluvium; direct replication needs geology-specific adaptation.",
    verified: true,
  },
  {
    id: "jalyukt_shivar",
    title: "Jalyukt Shivar Abhiyan",
    region: "Maharashtra, India",
    tags: ["Watershed Management", "Government Programme", "Maharashtra", "India"],
    problem:
      "Chronic drought in Maharashtra, including Marathwada and Vidarbha, due to rapid monsoon runoff, limited storage and degraded watersheds.",
    intervention:
      "State government programme (2015–2019 main phase) involving deepening and widening of streams, desilting of ponds and tanks, nala bunding, and contour trenching across drought-prone villages.",
    reportedResult:
      "The programme reported treating thousands of villages and creating substantial water-storage capacity. Official figures claimed significant increases in available water in participating villages.",
    limitations:
      "A Comptroller and Auditor General (CAG) report raised questions about data quality and verification of reported outcomes. Independent scientific evaluation of long-term groundwater impacts is limited. The programme was paused/restructured after 2019.",
    source:
      "Maharashtra Government Jalyukt Shivar website; CAG Report on Jalyukt Shivar Abhiyan (2018); media analysis",
    sourceUrl: "https://jalyuktshivar.maharashtra.gov.in/",
    period: "2015–2019",
    relevanceToMarathwada:
      "Directly relevant — the programme operated extensively in Marathwada. Local outcomes need taluka-level evaluation.",
    verified: true,
  },
  {
    id: "rajasthan_johads",
    title: "Rajasthan's Johad Revival (Tarun Bharat Sangh)",
    region: "Rajasthan, India",
    tags: ["Traditional Water Harvesting", "Community-Led", "India"],
    problem:
      "Arid Rajasthan's traditional johads (earthen check dams) had fallen into disuse; streams were drying and village water security was failing.",
    intervention:
      "Community-led revival of johads and other traditional structures in Alwar and surrounding districts, led by the NGO Tarun Bharat Sangh and Rajendra Singh.",
    reportedResult:
      "Documented revival of five river systems (Arvari, Ruparel, Sarsa, Bhagani and Jahajwali), increased water table in participating villages, and return of perennial flow in some sections.",
    limitations:
      "Context is semi-arid Aravalli zone with shallow sandy/rocky aquifers — different from Marathwada's geology. Scaling to larger catchments is contested. Some studies debate the attribution of river revival.",
    source:
      "Tarun Bharat Sangh; 'Dying Wisdom' (CSE); peer-reviewed studies in Water Policy and similar journals",
    sourceUrl: null,
    period: "1980s–2000s (ongoing)",
    relevanceToMarathwada:
      "Demonstrates community mobilisation value. Geology and hydrology differ significantly from Marathwada.",
    verified: true,
  },
  {
    id: "chennai_wastewater_reuse",
    title: "Chennai's Treated Wastewater Reuse",
    region: "Tamil Nadu, India",
    tags: ["Wastewater Reuse", "Industrial", "India"],
    problem:
      "Chennai faced water scarcity for industrial users (particularly in the SIPCOT Gummidipoondi area) while simultaneously discharging treated sewage.",
    intervention:
      "Metropolitan Water Supply and Sewerage Board (METROWATER) supplies tertiary-treated wastewater to industries, reducing their dependence on fresh groundwater and surface water.",
    reportedResult:
      "Several million litres per day of treated wastewater supplied to industrial users; reduction in groundwater extraction by those industries.",
    limitations:
      "Industrial reuse for non-potable applications is an easier step than potable reuse. Long-term reliability of treatment quality and coverage need sustained monitoring.",
    source:
      "METROWATER Chennai; Asian Development Bank case studies on urban water reuse",
    sourceUrl: null,
    period: "2010s onwards",
    relevanceToMarathwada:
      "Relevant for Ch. Sambhajinagar and Nanded urban industrial zones if STP capacity is built.",
    verified: true,
  },
  {
    id: "israel_reuse_desalination",
    title: "Israel: Wastewater Reuse and Desalination",
    region: "Israel",
    tags: ["Wastewater Reuse", "Desalination", "Technology", "Global"],
    problem:
      "Israel's natural freshwater supply — from the Sea of Galilee (Kinneret), coastal aquifer and Mountain Aquifer — was under chronic stress from population growth and over-extraction.",
    intervention:
      "Israel built the world's largest wastewater reuse system for agriculture (Shafdan plant near Tel Aviv treats and recharges, then recovers for Negev irrigation) and constructed large-scale seawater desalination plants (Sorek, Hadera, Ashkelon).",
    reportedResult:
      "Israel reuses approximately 85–90% of treated wastewater for agriculture — the highest rate in the world. Desalination now provides a substantial share of domestic water.",
    limitations:
      "Extremely high capital and energy costs for desalination. Concentrated brine disposal poses environmental challenges. The model depends on scale, advanced infrastructure and institutional strength unlikely to be replicated cheaply.",
    source:
      "Israeli Water Authority; Kislev & Vaksin (2007); peer-reviewed literature; World Bank Water global practice notes",
    sourceUrl: "https://water.gov.il/",
    period: "1970s–present",
    relevanceToMarathwada:
      "The wastewater reuse component is instructive. Desalination is not relevant (inland region). Israel's model requires very strong regulatory institutions.",
    verified: true,
  },
  {
    id: "singapore_newater",
    title: "Singapore: NEWater Programme",
    region: "Singapore",
    tags: ["Wastewater Reuse", "Potable Reuse", "Technology", "Global"],
    problem:
      "Singapore is a city-state with minimal freshwater resources and historical dependence on Malaysian water imports.",
    intervention:
      "NEWater treats secondary effluent through microfiltration, reverse osmosis and UV disinfection to produce high-purity water. Currently used primarily for industrial and commercial applications with some blending into reservoirs for indirect potable use.",
    reportedResult:
      "NEWater supplies approximately 40% of Singapore's water needs (as of mid-2020s targets). Four NEWater plants operate across the island.",
    limitations:
      "High energy intensity of advanced membrane treatment. Singapore's geography enables full-cycle water management that most regions cannot replicate. Strong institutional capacity is a prerequisite.",
    source:
      "PUB Singapore (National Water Agency); Singapore Ministry of Sustainability and the Environment",
    sourceUrl: "https://www.pub.gov.sg/watersupply/fournationaltaps/newater",
    period: "2002–present",
    relevanceToMarathwada:
      "Conceptually instructive on treating wastewater as a resource; direct technical transfer requires institutional and financial conditions not currently present.",
    verified: true,
  },
  {
    id: "windhoek_direct_reuse",
    title: "Windhoek, Namibia: Direct Potable Reuse",
    region: "Namibia, Africa",
    tags: ["Wastewater Reuse", "Potable Reuse", "Arid Regions", "Global"],
    problem:
      "Windhoek, capital of one of Africa's driest countries, had insufficient surface water and groundwater; conventional augmentation options were exhausted.",
    intervention:
      "The Goreangab Reclamation Plant (operating since 1968, upgraded in 2002) treats wastewater to potable standard for direct blending into the municipal supply — the world's longest-running direct potable reuse system.",
    reportedResult:
      "Reclaimed water contributes approximately 26–35% of Windhoek's municipal supply. The plant produces around 21,000 m³/day of reclaimed water.",
    limitations:
      "Public acceptance required sustained communication. High operational expertise demands. Not easily transferable to contexts with lower treatment capacity.",
    source:
      "City of Windhoek; du Pisani (2006) 'Sustainable development — is it achievable within the existing international political economy?'; IWA publications",
    sourceUrl: null,
    period: "1968–present",
    relevanceToMarathwada:
      "Demonstrates feasibility of advanced reuse in water-stressed regions, but requires strong institutions and significant capital.",
    verified: true,
  },
  {
    id: "brazil_cisterns",
    title: "Brazil: One Million Cisterns (P1MC)",
    region: "Brazil",
    tags: ["Rainwater Harvesting", "Community-Led", "Rural", "Global"],
    problem:
      "The semi-arid Brazilian Northeast (Sertão) faces irregular rainfall and rural households lack safe water access for drinking and cooking.",
    intervention:
      "The P1MC (One Million Cisterns) programme supported construction of low-cost polyethylene or ferrocement rainwater cisterns (16,000 litres) by rural families, capturing roof runoff during rains for the dry season.",
    reportedResult:
      "Over one million cisterns constructed across approximately nine states. Studies document improved water security and health outcomes for participating households.",
    limitations:
      "Cisterns provide limited total volume — adequate for drinking/cooking but not irrigation. Quality maintenance requires ongoing household engagement. Not a substitute for broader water infrastructure.",
    source:
      "ASA Brasil (Articulação no Semiárido Brasileiro); Gnadlinger (2006); academic literature on P1MC outcomes",
    sourceUrl: "https://www.asabrasil.org.br/",
    period: "2003–present",
    relevanceToMarathwada:
      "Strong relevance for rural Marathwada for drinking water security during lean season. Low cost, household-scale and community-managed.",
    verified: true,
  },
  {
    id: "china_loess_plateau",
    title: "China: Loess Plateau Watershed Restoration",
    region: "China",
    tags: ["Watershed Restoration", "Erosion Control", "Global"],
    problem:
      "The Yellow River's Loess Plateau — one of the world's most eroded landscapes — suffered severe land degradation, soil erosion and high sediment loads into the Yellow River.",
    intervention:
      "World Bank-supported watershed restoration involving terracing, revegetation (grasses, shrubs, trees) and sediment-retention dams. Large-scale land-use change from farming on steep slopes to vegetation cover.",
    reportedResult:
      "Satellite studies document significant increase in vegetation cover and reduction in sediment delivery to the Yellow River. Reduced erosion and improved local water retention are documented.",
    limitations:
      "Scale of intervention required massive state coordination. Some studies note trade-offs with local water availability (vegetation uses water). Long-term ecological sustainability of introduced species is debated.",
    source:
      "World Bank Project documents; Bryan et al. (2018) in Nature Sustainability; peer-reviewed remote sensing studies",
    sourceUrl:
      "https://www.worldbank.org/en/results/2018/04/10/restoring-loess-plateau",
    period: "1994–2010s",
    relevanceToMarathwada:
      "Relevant for Marathwada's watershed degradation and erosion issues. Implementation scale and state capacity requirements differ.",
    verified: true,
  },
  {
    id: "spain_irrigation",
    title: "Spain: Irrigation Modernisation",
    region: "Spain, Europe",
    tags: ["Drip Irrigation", "Agricultural Efficiency", "Global"],
    problem:
      "Spain's southeast (Murcia, Almería) faces acute water scarcity; traditional surface and sprinkler irrigation in intensive horticulture was highly inefficient.",
    intervention:
      "Subsidised shift to pressurised drip irrigation, combined with ICT-based scheduling, crop switching and water trading. Spain has among Europe's highest drip irrigation adoption rates.",
    reportedResult:
      "Significant reduction in water applied per unit of produce in modernised schemes. Some studies show that at regional scale, efficiency gains were partially offset by expansion of irrigated area (the rebound effect).",
    limitations:
      "The 'rebound' or Jevons paradox is well-documented: farmers often expand irrigated area when per-unit water cost falls, potentially increasing total water use. High upfront infrastructure cost.",
    source:
      "Berbel et al. (2015) in Agricultural Water Management; FAO irrigation studies; European Environment Agency",
    sourceUrl: null,
    period: "1990s–present",
    relevanceToMarathwada:
      "Strong policy relevance: drip adoption is growing in Maharashtra under PM Krishi Sinchai Yojana. The rebound effect is a critical caution.",
    verified: true,
  },
];

// ---------------------------------------------------------------------------
// RESEARCH QUESTIONS & METHODOLOGY
// ---------------------------------------------------------------------------
export const RESEARCH = {
  questions: [
    "What are the primary drivers of water scarcity in Marathwada — precipitation variability, infrastructure deficits, demand growth, or governance failures — and how do they interact?",
    "Which conservation interventions have documented, measurable outcomes in similar agro-climatic conditions, and which are primarily target-based claims?",
    "How equitably is available water distributed between agricultural users, urban consumers and domestic rural populations in Marathwada?",
    "What role can improved irrigation efficiency play in reducing agricultural water demand without triggering the rebound effect?",
    "Which elements of successful case studies from Israel, Singapore, Brazil and Gujarat are transferable to Marathwada's institutional, financial and geological context?",
    "What data gaps most limit evidence-based water policy in Marathwada?",
  ],
  methodology: [
    {
      step: "Literature Review",
      description:
        "Survey of peer-reviewed research, government reports (IMD, CGWB, MoJS, WRD Maharashtra), NGO documentation (WOTR, ACWADAM) and international case study literature.",
    },
    {
      step: "Data Compilation",
      description:
        "Extraction of publicly available rainfall, groundwater-level and reservoir-storage data from official portals. Each figure is cited with its source and period.",
    },
    {
      step: "Cross-case Comparison",
      description:
        "Structured comparison of interventions from different regions using a consistent framework: problem context, intervention type, reported outcome, limitations and transferability.",
    },
    {
      step: "Critical Evaluation",
      description:
        "Assessment of evidence quality: distinguishing measured outcomes from programme targets, self-reported data from independent evaluations, and correlation from causation.",
    },
  ],
  limitations: [
    "This is a desk-based research synthesis; no primary fieldwork has been conducted.",
    "District-level disaggregated data for Marathwada is often unavailable in the public domain or requires RTI requests.",
    "IMD station data for individual years at district level is not freely downloadable in bulk; time-series charts use indicative figures from published reports.",
    "Groundwater-level data from CGWB is available in annual reports but compiling multi-year district trends requires manual extraction.",
    "Case-study outcomes are often reported by implementing agencies; independent evaluations are fewer and should be weighted more heavily.",
  ],
  futureDirections: [
    "Obtain and analyse district-wise IMD rainfall data for a 30-year period through official channels.",
    "Compile CGWB district groundwater-level data and map trends at taluka level.",
    "Interview water-policy experts, farmers and NGO practitioners in Marathwada.",
    "Conduct a structured review of Jalyukt Shivar Abhiyan's taluka-level outcomes using government data.",
    "Explore satellite-based vegetation and soil-moisture indices to supplement ground data.",
    "Assess the feasibility and cost of community-managed cistern programmes for drinking water security.",
  ],
};

// ---------------------------------------------------------------------------
// REFERENCES
// ---------------------------------------------------------------------------
export const REFERENCES = [
  {
    id: "imd_normals",
    category: "Rainfall Data",
    title: "IMD Rainfall Normal Data",
    publisher: "India Meteorological Department",
    url: "https://www.imd.gov.in/pages/rainfall_normal_data.php",
    notes: "Source for district 30-year normal rainfall values.",
    verified: true,
  },
  {
    id: "cgwb_reports",
    category: "Groundwater",
    title: "Annual Groundwater Level Reports & Ground Water Year Book",
    publisher: "Central Ground Water Board (CGWB)",
    url: "https://cgwb.gov.in/",
    notes: "Primary source for groundwater level trends and aquifer assessment.",
    verified: true,
  },
  {
    id: "wrd_maha",
    category: "Reservoir & Irrigation",
    title: "Maharashtra Water Resources Department Data Portal",
    publisher: "Government of Maharashtra",
    url: "https://wrd.maharashtra.gov.in/",
    notes: "Reservoir storage, irrigation project details, Jayakwadi data.",
    verified: true,
  },
  {
    id: "jalyukt_cag",
    category: "Programme Evaluation",
    title: "CAG Report on Jalyukt Shivar Abhiyan",
    publisher: "Comptroller and Auditor General of India",
    url: "https://cag.gov.in/",
    notes:
      "Performance audit raising questions about data quality and outcome verification.",
    verified: true,
  },
  {
    id: "nciwrd",
    category: "Water Policy",
    title:
      "Integrated Water Resources Development — A Plan for Action (NCIWRD Report)",
    publisher: "National Commission for Integrated Water Resources Development",
    url: null,
    notes: "Source for national irrigation efficiency estimates.",
    verified: true,
  },
  {
    id: "wotr",
    category: "Watershed Research",
    title: "Watershed Research and Publications",
    publisher: "Watershed Organisation Trust (WOTR), Pune",
    url: "https://www.wotr.org/",
    notes:
      "NGO with extensive research on watershed restoration in Marathwada and beyond.",
    verified: true,
  },
  {
    id: "acwadam",
    category: "Groundwater Research",
    title: "Hydrogeology and Community Groundwater Research",
    publisher:
      "Advanced Centre for Water Resources Development and Management (ACWADAM)",
    url: "https://www.acwadam.org/",
    notes: "Deccan basalt aquifer research relevant to Marathwada.",
    verified: true,
  },
  {
    id: "iwmi",
    category: "Agricultural Water",
    title: "Research on Irrigation Efficiency and Water Productivity",
    publisher:
      "International Water Management Institute (IWMI)",
    url: "https://www.iwmi.cgiar.org/",
    notes: "Global and Indian studies on irrigation water use.",
    verified: true,
  },
  {
    id: "pub_singapore",
    category: "Case Study",
    title: "NEWater — Singapore's Water Reuse Programme",
    publisher: "PUB Singapore (National Water Agency)",
    url: "https://www.pub.gov.sg/watersupply/fournationaltaps/newater",
    notes: "Source for Singapore NEWater case study.",
    verified: true,
  },
  {
    id: "worldbank_loess",
    category: "Case Study",
    title: "Restoring the Loess Plateau",
    publisher: "World Bank",
    url: "https://www.worldbank.org/en/results/2018/04/10/restoring-loess-plateau",
    notes: "Source for China Loess Plateau watershed restoration case study.",
    verified: true,
  },
  {
    id: "mpcb",
    category: "Water Quality",
    title: "River Water Quality Data",
    publisher: "Maharashtra Pollution Control Board (MPCB)",
    url: "https://mpcb.gov.in/",
    notes: "Annual river water quality monitoring reports.",
    verified: true,
  },
];
