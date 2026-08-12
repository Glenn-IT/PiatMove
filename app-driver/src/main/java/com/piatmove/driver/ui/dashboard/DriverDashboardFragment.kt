package com.piatmove.driver.ui.dashboard

import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.fragment.app.Fragment
import androidx.lifecycle.ViewModelProvider
import com.piatmove.core.data.local.PrefsManager
import com.piatmove.driver.R
import com.piatmove.driver.databinding.FragmentDriverDashboardBinding
import com.piatmove.driver.ui.home.DriverViewModel

class DriverDashboardFragment : Fragment() {

    private var _binding: FragmentDriverDashboardBinding? = null
    private val binding get() = _binding!!
    private lateinit var viewModel: DriverViewModel

    override fun onCreateView(inflater: LayoutInflater, container: ViewGroup?, savedInstanceState: Bundle?): View {
        _binding = FragmentDriverDashboardBinding.inflate(inflater, container, false)
        return binding.root
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)

        viewModel = ViewModelProvider(requireActivity())[DriverViewModel::class.java]

        val name = PrefsManager.getUserName(requireContext()) ?: "Driver"
        binding.tvGreeting.text = "Hello, $name!"

        binding.switchOnline.isChecked = viewModel.isOnline.value ?: false

        binding.switchOnline.setOnCheckedChangeListener { _, isChecked ->
            viewModel.toggleOnline(isChecked)
        }

        viewModel.isOnline.observe(viewLifecycleOwner) { online ->
            binding.switchOnline.isChecked = online
            if (online) {
                binding.tvOnlineStatus.text  = getString(R.string.status_online)
                binding.tvOnlineSubtitle.text = getString(R.string.status_online_sub)
                binding.tvOnlineStatus.setTextColor(requireContext().getColor(R.color.statusCompleted))
            } else {
                binding.tvOnlineStatus.text  = getString(R.string.status_offline)
                binding.tvOnlineSubtitle.text = getString(R.string.status_offline_sub)
                binding.tvOnlineStatus.setTextColor(requireContext().getColor(R.color.black))
            }
        }
    }

    override fun onDestroyView() {
        super.onDestroyView()
        _binding = null
    }
}
