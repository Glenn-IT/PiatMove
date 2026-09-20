package com.piatmove.passenger.ui.booking

data class PiatPlace(
    val name: String,
    val category: String,
    val barangay: String,
    val lat: Double,
    val lng: Double,
    val icon: String = "📍"
) {
    val fullDisplayName: String
        get() = "$name, $barangay, Piat"

    val subTitle: String
        get() = "$category • $barangay, Piat"

    override fun toString(): String = fullDisplayName
}

object PiatPlacesDirectory {

    val places: List<PiatPlace> = listOf(
        // Popular Landmarks & Shrines
        PiatPlace("Basilica Minore of Our Lady of Piat", "Shrine & Pilgrimage Church", "Poblacion", 17.7915, 121.4725, "⛪"),
        PiatPlace("Our Lady of Piat Museum", "Religious Heritage Site", "Poblacion", 17.7918, 121.4730, "🏛️"),
        PiatPlace("Piat Municipal Hall", "LGU Town Hall", "Poblacion", 17.7885, 121.4682, "🏛️"),
        PiatPlace("Piat Public Market", "Commercial & Wet Market", "Poblacion", 17.7878, 121.4665, "🛒"),
        PiatPlace("Piat Town Plaza & Gymnasium", "Public Plaza & Sports", "Poblacion", 17.7890, 121.4688, "🏟️"),
        PiatPlace("Piat Rural Health Unit (RHU Clinic)", "Emergency & Healthcare", "Poblacion", 17.7880, 121.4695, "🏥"),
        PiatPlace("Piat Police Station (PNP Station)", "Emergency & Police", "Poblacion", 17.7892, 121.4678, "👮"),
        PiatPlace("Landbank of the Philippines (ATM / Branch)", "Banking & Finance", "Poblacion", 17.7882, 121.4670, "🏦"),
        PiatPlace("Piat Central Tricycle Terminal", "Transport Hub", "Poblacion", 17.7875, 121.4660, "🛺"),
        PiatPlace("Basilica Tricycle & Van Terminal", "Transport Hub", "Poblacion", 17.7910, 121.4718, "🛺"),
        PiatPlace("Itawes River Bridge Viewpoint", "Scenic Bridge", "Piat", 17.7965, 121.4630, "🌉"),
        PiatPlace("Piat Catholic Parish Cemetery", "Cemetery", "Poblacion", 17.7950, 121.4750, "✝️"),
        PiatPlace("Piat Public Municipal Cemetery", "Cemetery", "Poblacion", 17.7935, 121.4740, "⚰️"),

        // Schools & Universities
        PiatPlace("Cagayan State University - Piat Campus (CSU Piat)", "State University", "Baung", 17.7725, 121.4980, "🎓"),
        PiatPlace("Piat National High School", "Secondary School", "Poblacion", 17.7852, 121.4650, "🏫"),
        PiatPlace("Piat Central Elementary School", "Elementary School", "Poblacion", 17.7898, 121.4705, "🎒"),
        PiatPlace("Maguilling National High School", "Secondary School", "Maguilling", 17.7535, 121.4365, "🏫"),
        PiatPlace("Sto. Domingo Elementary School", "Elementary School", "Santo Domingo", 17.7790, 121.4590, "🎒"),
        PiatPlace("Aquib Elementary School", "Elementary School", "Aquib", 17.8060, 121.4560, "🎒"),
        PiatPlace("Baung Elementary School", "Elementary School", "Baung", 17.7700, 121.5000, "🎒"),
        PiatPlace("Calaoagan Elementary School", "Elementary School", "Calaoagan", 17.8210, 121.4800, "🎒"),
        PiatPlace("Gumarueng Elementary School", "Elementary School", "Gumarueng", 17.8020, 121.4900, "🎒"),
        PiatPlace("Macapil Elementary School", "Elementary School", "Macapil", 17.8175, 121.4625, "🎒"),
        PiatPlace("Minanga Elementary School", "Elementary School", "Minanga", 17.8295, 121.4505, "🎒"),
        PiatPlace("Santa Barbara Elementary School", "Elementary School", "Santa Barbara", 17.8265, 121.4925, "🎒"),
        PiatPlace("Sicatna Elementary School", "Elementary School", "Sicatna", 17.7955, 121.4975, "🎒"),
        PiatPlace("Warat Elementary School", "Elementary School", "Warat", 17.8105, 121.5115, "🎒"),
        PiatPlace("Apayao Elementary School", "Elementary School", "Apayao", 17.7545, 121.4815, "🎒"),
        PiatPlace("Catarauan Elementary School", "Elementary School", "Catarauan", 17.8125, 121.4385, "🎒"),
        PiatPlace("Dugayung Elementary School", "Elementary School", "Dugayung", 17.7675, 121.4455, "🎒"),
        PiatPlace("Villa Rey Elementary School", "Elementary School", "Villa Rey", 17.7615, 121.5175, "🎒"),
        PiatPlace("Villa Reyno Elementary School", "Elementary School", "Villa Reyno", 17.7475, 121.5085, "🎒"),

        // All 18 Official Barangays of Piat
        PiatPlace("Barangay Poblacion I (Centro)", "Barangay Center", "Poblacion I", 17.7887, 121.4673, "🏘️"),
        PiatPlace("Barangay Poblacion II", "Barangay Center", "Poblacion II", 17.7905, 121.4710, "🏘️"),
        PiatPlace("Barangay Apayao", "Barangay Center", "Apayao", 17.7550, 121.4820, "🏘️"),
        PiatPlace("Barangay Aquib", "Barangay Center", "Aquib", 17.8050, 121.4550, "🏘️"),
        PiatPlace("Barangay Baung", "Barangay Center", "Baung", 17.7710, 121.5010, "🏘️"),
        PiatPlace("Barangay Calaoagan", "Barangay Center", "Calaoagan", 17.8220, 121.4810, "🏘️"),
        PiatPlace("Barangay Catarauan", "Barangay Center", "Catarauan", 17.8130, 121.4390, "🏘️"),
        PiatPlace("Barangay Dugayung", "Barangay Center", "Dugayung", 17.7680, 121.4460, "🏘️"),
        PiatPlace("Barangay Gumarueng", "Barangay Center", "Gumarueng", 17.8010, 121.4890, "🏘️"),
        PiatPlace("Barangay Macapil", "Barangay Center", "Macapil", 17.8180, 121.4630, "🏘️"),
        PiatPlace("Barangay Maguilling", "Barangay Center", "Maguilling", 17.7520, 121.4350, "🏘️"),
        PiatPlace("Barangay Minanga", "Barangay Center", "Minanga", 17.8300, 121.4510, "🏘️"),
        PiatPlace("Barangay Santa Barbara", "Barangay Center", "Santa Barbara", 17.8270, 121.4930, "🏘️"),
        PiatPlace("Barangay Santo Domingo", "Barangay Center", "Santo Domingo", 17.7780, 121.4580, "🏘️"),
        PiatPlace("Barangay Sicatna", "Barangay Center", "Sicatna", 17.7960, 121.4980, "🏘️"),
        PiatPlace("Barangay Villa Rey (San Gaspar)", "Barangay Center", "Villa Rey", 17.7620, 121.5180, "🏘️"),
        PiatPlace("Barangay Villa Reyno", "Barangay Center", "Villa Reyno", 17.7480, 121.5090, "🏘️"),
        PiatPlace("Barangay Warat", "Barangay Center", "Warat", 17.8110, 121.5120, "🏘️")
    )
}
