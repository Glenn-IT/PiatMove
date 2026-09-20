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
        // Popular Landmarks & Shrines (Accurate Real-World Coordinates)
        PiatPlace("Basilica Minore of Our Lady of Piat", "Shrine & Pilgrimage Church", "Poblacion", 17.78702, 121.48010, "⛪"),
        PiatPlace("Our Lady of Piat Museum", "Religious Heritage Site", "Poblacion", 17.78720, 121.48030, "🏛️"),
        PiatPlace("Piat Municipal Hall", "LGU Town Hall", "Poblacion", 17.79204, 121.47694, "🏛️"),
        PiatPlace("Piat Public Market", "Commercial & Wet Market", "Poblacion", 17.78867, 121.48142, "🛒"),
        PiatPlace("Piat Town Plaza & Gymnasium", "Public Plaza & Sports", "Poblacion", 17.79167, 121.47708, "🏟️"),
        PiatPlace("Piat Rural Health Unit (RHU Clinic)", "Emergency & Healthcare", "Poblacion", 17.79008, 121.48116, "🏥"),
        PiatPlace("Nuestra Señora de Piat District Hospital", "Hospital", "Maguilling", 17.77578, 121.50206, "🏥"),
        PiatPlace("Piat Police Station (PNP Station)", "Emergency & Police", "Poblacion", 17.78511, 121.48660, "👮"),
        PiatPlace("Landbank of the Philippines (ATM / Branch)", "Banking & Finance", "Poblacion", 17.79180, 121.47680, "🏦"),
        PiatPlace("Piat Transport Terminal", "Transport Hub", "Poblacion", 17.78678, 121.48399, "🛺"),
        PiatPlace("Basilica Tricycle & Van Terminal", "Transport Hub", "Poblacion", 17.78690, 121.48150, "🛺"),
        PiatPlace("Piat Roman Catholic Cemetery", "Cemetery", "Poblacion", 17.78748, 121.48509, "✝️"),

        // Schools & Universities
        PiatPlace("Cagayan State University - Piat Campus (CSU Piat)", "State University", "Baung", 17.79282, 121.51592, "🎓"),
        PiatPlace("Piat National High School", "Secondary School", "Poblacion", 17.79362, 121.48080, "🏫"),
        PiatPlace("Piat Central Elementary School", "Elementary School", "Poblacion", 17.79245, 121.47587, "🎒"),
        PiatPlace("Our Lady of Piat High School", "Secondary School", "Poblacion", 17.79090, 121.47717, "🏫"),
        PiatPlace("Maguilling Elementary School", "Elementary School", "Maguilling", 17.76000, 121.50000, "🎒"),
        PiatPlace("Sto. Domingo Elementary School", "Elementary School", "Santo Domingo", 17.73000, 121.52000, "🎒"),
        PiatPlace("Aquib Elementary School", "Elementary School", "Aquib", 17.79000, 121.47000, "🎒"),
        PiatPlace("Baung Elementary School", "Elementary School", "Baung", 17.78000, 121.49000, "🎒"),
        PiatPlace("Gumarueng Elementary School", "Elementary School", "Gumarueng", 17.78000, 121.45000, "🎒"),
        PiatPlace("Macapil Elementary School", "Elementary School", "Macapil", 17.77000, 121.46000, "🎒"),
        PiatPlace("Minanga Elementary School", "Elementary School", "Minanga", 17.83000, 121.50000, "🎒"),
        PiatPlace("Sicatna Elementary School", "Elementary School", "Sicatna", 17.82000, 121.47000, "🎒"),
        PiatPlace("Dugayung Elementary School", "Elementary School", "Dugayung", 17.81000, 121.46000, "🎒"),
        PiatPlace("Apayao Elementary School", "Elementary School", "Apayao", 17.82000, 121.49000, "🎒"),

        // Official Barangays of Piat
        PiatPlace("Barangay Poblacion I (Centro)", "Barangay Center", "Poblacion I", 17.78850, 121.48050, "🏘️"),
        PiatPlace("Barangay Poblacion II", "Barangay Center", "Poblacion II", 17.79150, 121.48100, "🏘️"),
        PiatPlace("Barangay Apayao", "Barangay Center", "Apayao", 17.82000, 121.49000, "🏘️"),
        PiatPlace("Barangay Aquib", "Barangay Center", "Aquib", 17.79000, 121.47000, "🏘️"),
        PiatPlace("Barangay Baung", "Barangay Center", "Baung", 17.78000, 121.49000, "🏘️"),
        PiatPlace("Barangay Calaoagan", "Barangay Center", "Calaoagan", 17.82200, 121.48100, "🏘️"),
        PiatPlace("Barangay Catarauan", "Barangay Center", "Catarauan", 17.78000, 121.60000, "🏘️"),
        PiatPlace("Barangay Dugayung", "Barangay Center", "Dugayung", 17.81000, 121.46000, "🏘️"),
        PiatPlace("Barangay Gumarueng", "Barangay Center", "Gumarueng", 17.78000, 121.45000, "🏘️"),
        PiatPlace("Barangay Macapil", "Barangay Center", "Macapil", 17.77000, 121.46000, "🏘️"),
        PiatPlace("Barangay Maguilling", "Barangay Center", "Maguilling", 17.77000, 121.50000, "🏘️"),
        PiatPlace("Barangay Minanga", "Barangay Center", "Minanga", 17.83000, 121.50000, "🏘️"),
        PiatPlace("Barangay Santa Barbara", "Barangay Center", "Santa Barbara", 17.82700, 121.49300, "🏘️"),
        PiatPlace("Barangay Santo Domingo", "Barangay Center", "Santo Domingo", 17.73000, 121.52000, "🏘️"),
        PiatPlace("Barangay Sicatna", "Barangay Center", "Sicatna", 17.82000, 121.47000, "🏘️"),
        PiatPlace("Barangay Villa Rey (San Gaspar)", "Barangay Center", "Villa Rey", 17.71000, 121.55000, "🏘️"),
        PiatPlace("Barangay Villa Reyno", "Barangay Center", "Villa Reyno", 17.74800, 121.50900, "🏘️"),
        PiatPlace("Barangay Warat", "Barangay Center", "Warat", 17.71000, 121.58000, "🏘️")
    )
}
